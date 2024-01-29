import torch
import evaluate
import numpy as np
from datasets import load_dataset, load_dataset_builder, Audio
from transformers import AutoProcessor, AutoModelForCTC, TrainingArguments, Trainer, pipeline
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Union

"""
May be used to check info of dataset before downloading it
ds_builder = load_dataset_builder("librispeech_asr")
ds_builder.info.description
ds_builder.info.features
"""

librispeech =  load_dataset("librispeech_asr", name = "en-US", split = "train.clean.100")
librispeech = librispeech.train_test_split(test_size=0.2)
librispeech
librispeech = librispeech.remove_columns(["speaker_id", "chapter_id", "id"])

processor = AutoProcessor.from_pretrained("facebook/wav2vec2-base")

def prepare_dataset(batch):
    audio = batch["audio"]
    batch = processor(audio["array"], sampling_rate=audio["sampling_rate"], text=batch["transcription"])
    batch["input_length"] = len(batch["input_values"][0])
    return batch

encoded_librispeech = librispeech.map(prepare_dataset, remove_columns=librispeech.column_names["train"], num_proc=4)

class DataCollatorCTCWithPadding:

    processor: AutoProcessor

    padding: Union[bool, str] = "longest"

    def __call__(self, features: List[Dict[str, Union[List[int], torch.Tensor]]]) -> Dict[str, torch.Tensor]:

        # split inputs and labels since they have to be of different lengths and need

        # different padding methods

        input_features = [{"input_values": feature["input_values"][0]} for feature in features]

        label_features = [{"input_ids": feature["labels"]} for feature in features]

        batch = self.processor.pad(input_features, padding=self.padding, return_tensors="pt")

        labels_batch = self.processor.pad(labels=label_features, padding=self.padding, return_tensors="pt")

        # replace padding with -100 to ignore loss correctly

        labels = labels_batch["input_ids"].masked_fill(labels_batch.attention_mask.ne(1), -100)

        batch["labels"] = labels

        return batch
    
data_collator = DataCollatorCTCWithPadding(processor=processor, padding="longest")

wer = evaluate.load("wer")

def compute_metrics(pred):

    pred_logits = pred.predictions
    pred_ids = np.argmax(pred_logits, axis=-1)

    pred.label_ids[pred.label_ids == -100] = processor.tokenizer.pad_token_id

    pred_str = processor.batch_decode(pred_ids)
    label_str = processor.batch_decode(pred.label_ids, group_tokens=False)

    wer = wer.compute(predictions=pred_str, references=label_str)

    return {"wer": wer}

model = AutoModelForCTC.from_pretrained(

    "facebook/wav2vec2-base",

    ctc_loss_reduction="mean",

    pad_token_id=processor.tokenizer.pad_token_id,

)

training_args = TrainingArguments(
    output_dir="/home/codylong/Personal/ASRTest/finetunedmodel",
    per_device_train_batch_size=8,
    gradient_accumulation_steps=2,
    learning_rate=1e-5,
    warmup_steps=500,
    max_steps=2000,
    gradient_checkpointing=True,
    fp16=True,
    group_by_length=True,
    evaluation_strategy="steps",
    per_device_eval_batch_size=8,
    save_steps=1000,
    eval_steps=1000,
    logging_steps=25,
    load_best_model_at_end=True,
    metric_for_best_model="wer",
    greater_is_better=False,
    push_to_hub=False,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=encoded_librispeech["train"],
    eval_dataset=encoded_librispeech["test"],
    tokenizer=processor,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
)

trainer.train()

dataset = load_dataset("librispeech_asr", "en-US", split="train.clean.100")
dataset = dataset.cast_column("audio", Audio(sampling_rate=16000))
sampling_rate = dataset.features["audio"].sampling_rate
audio_file = dataset[0]["audio"]["path"]

transcriber = pipeline("automatic-speech-recognition", model="/home/codylong/Personal/ASRTest/finetunedmodel")
transcriber(audio_file)
