import gc
import os
import evaluate
import torch
import numpy as np
from tqdm import tqdm
from dataclasses import dataclass, field
from datasets import load_dataset, Audio, DatasetDict
from huggingface_hub import notebook_login
from peft import LoraConfig, PeftModel, LoraModel, LoraConfig, get_peft_model
from torch.utils.data import DataLoader
from typing import Any, Dict, List, Union
from transformers import AutoFeatureExtractor, AutoTokenizer, AutoProcessor, AutoModelForCTC, TrainingArguments, Trainer, TrainerState, TrainerControl, TrainerCallback
from transformers.trainer_utils import PREFIX_CHECKPOINT_DIR

os.environ["CUDA_VISIBLE_DEVICES"] = "0"
model_name_or_path = "facebook/wav2vec2-base"
language = "English"
task = "transcribe"
dataset_name = "librispeech_asr"

notebook_login()

librispeech = DatasetDict()
librispeech = load_dataset(dataset_name, split = "train.clean.100")
librispeech = librispeech.train_test_split(test_size = 0.2)

feature_extractor = AutoFeatureExtractor.from_pretrained(model_name_or_path)
tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, language=language, task=task)
processor = AutoProcessor.from_pretrained(model_name_or_path, language=language, task=task)

librispeech = librispeech.remove_columns(["file", "speaker_id", "chapter_id", "id"])

def prepare_dataset(batch):
    audio = batch["audio"]
    batch["input_features"] = feature_extractor(audio["array"], sampling_rate=audio["sampling_rate"]).input_features[0]
    batch["labels"] = tokenizer(batch["text"]).input_ids
    return batch

encoded_librispeech = librispeech.map(prepare_dataset, remove_columns=librispeech.column_names["train"], num_proc=2)

@dataclass
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

model = AutoModelForCTC.from_pretrained(
    "facebook/wav2vec2-base",
    ctc_loss_reduction="mean",
    pad_token_id=processor.tokenizer.pad_token_id,
)

config = LoraConfig(r=8, lora_alpha=32, target_modules=["k_proj", "q_proj"], lora_dropout=0.1, bias="True")

model.config.forced_decoder_ids = None
model.config.suppress_tokens = []

def print_trainable_parameters(model):
    trainable_params = 0
    all_param = 0
    for _, param in model.named_parameters():
        all_param += param.numel()
        if param.requires_grad:
            trainable_params += param.numel()
    print(
        f"trainable params: {trainable_params} || all params: {all_param} || trainable%: {100 * trainable_params / all_param:.2f}"
    )

wer = evaluate.load("wer")

def compute_metrics(pred):

    pred_logits = pred.predictions

    pred_ids = np.argmax(pred_logits, axis=-1)

    pred.label_ids[pred.label_ids == -100] = processor.tokenizer.pad_token_id

    pred_str = processor.batch_decode(pred_ids)

    label_str = processor.batch_decode(pred.label_ids, group_tokens=False)

    wer = wer.compute(predictions=pred_str, references=label_str)

    return {"wer": wer}

model = get_peft_model(model, config)
model.print_trainable_parameters()

training_args = TrainingArguments(
    output_dir="my_awesome_asr_mind_model",
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
    push_to_hub=True,
)

class SavePeftModelCallback(TrainerCallback):
    def on_save(
        self,
        args: TrainingArguments,
        state: TrainerState,
        control: TrainerControl,
        **kwargs,
    ):
        checkpoint_folder = os.path.join(args.output_dir, f"{PREFIX_CHECKPOINT_DIR}-{state.global_step}")

        peft_model_path = os.path.join(checkpoint_folder, "adapter_model")
        kwargs["model"].save_pretrained(peft_model_path)

        pytorch_model_path = os.path.join(checkpoint_folder, "pytorch_model.bin")
        if os.path.exists(pytorch_model_path):
            os.remove(pytorch_model_path)
        return control

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=encoded_librispeech["train"],
    eval_dataset=encoded_librispeech["test"],
    tokenizer=processor.feature_extractor,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
    callbacks = [SavePeftModelCallback]
)

trainer.train()
model.push_to_hub("cjccl/labeledwav2vec2-base")