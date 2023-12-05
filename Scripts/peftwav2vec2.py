import os
import gc
import torch
import evaluate
import numpy as np
from torch.utils.data import DataLoader
from tqdm import tqdm
from datasets import load_dataset, Audio,  DatasetDict
from dataclasses import dataclass, field
from peft import LoraConfig, PeftModel, LoraModel, get_peft_model
from typing import Any, Dict, List, Optional, Union
from transformers.trainer_utils import PREFIX_CHECKPOINT_DIR
from transformers import AutoFeatureExtractor, AutoTokenizer, AutoProcessor, AutoModelForSpeechSeq2Seq, Seq2SeqTrainingArguments, Seq2SeqTrainer, TrainerCallback, Seq2SeqTrainingArguments, TrainerState, TrainerControl

os.environ["CUDA_VISIBLE_DEVICES"] = "0"
model_name_or_path = "facebook/wav2vec2-base"
task = "transcribe"
dataset_name = "librispeech_asr"

librispeech = DatasetDict()
librispeech = load_dataset(dataset_name, split = "train.clean.100")
librispeech = librispeech.train_test_split(test_size=0.2)

feature_extractor = AutoFeatureExtractor.from_pretrained(model_name_or_path)
tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, task=task)
processor = AutoProcessor.from_pretrained(model_name_or_path, task=task)

librispeech = librispeech.remove_columns(["file", "speaker_id", "chapter_id", "id"])

def prepare_dataset(batch):
    audio = batch["audio"]
    batch["input_features"] = feature_extractor(audio["array"], sampling_rate=audio["sampling_rate"]).input_features[0]
    batch["labels"] = tokenizer(batch["text"]).input_ids
    return batch

librispeech = librispeech.map(prepare_dataset, remove_columns=librispeech.column_names["train"], num_proc=2)

@dataclass
class DataCollatorSpeechSeq2SeqWithPadding:
    processor: Any

    def __call__(self, features: List[Dict[str, Union[List[int], torch.Tensor]]]) -> Dict[str, torch.Tensor]:
        input_features = [{"input_features": feature["input_features"]} for feature in features]
        batch = self.processor.feature_extractor.pad(input_features, return_tensors="pt")

        label_features = [{"input_ids": feature["labels"]} for feature in features]
        labels_batch = self.processor.tokenizer.pad(label_features, return_tensors="pt")

        labels = labels_batch["input_ids"].masked_fill(labels_batch.attention_mask.ne(1), -100)

        if (labels[:, 0] == self.processor.tokenizer.bos_token_id).all().cpu().item():
            labels = labels[:, 1:]

        batch["labels"] = labels

        return batch


data_collator = DataCollatorSpeechSeq2SeqWithPadding(processor=processor)

model = AutoModelForSpeechSeq2Seq.from_pretrained(model_name_or_path, load_in_8bit=True, device_map="auto")
model.config.forced_decoder_ids = None
model.config.suppress_tokens = []

peft_config = LoraConfig(inference_mode=False, r=8, lora_alpha=32, lora_dropout=0.1, target_modules=["k_proj", "q_proj"])
model = get_peft_model(model, peft_config)
model.print_trainable_parameters()

training_args = Seq2SeqTrainingArguments(
    output_dir="tni-lab/peft-facebook-wav2vec2-base-asr",
    per_device_train_batch_size=8,
    gradient_accumulation_steps=1,
    learning_rate=1e-3,
    warmup_steps=50,
    num_train_epochs=3,
    evaluation_strategy="epoch",
    fp16=True,
    per_device_eval_batch_size=8,
    generation_max_length=128,
    logging_steps=25,
    remove_unused_columns=False,
    label_names=["labels"],
)

class SavePeftModelCallback(TrainerCallback):
    def on_save(
        self,
        args: training_args,
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
    
trainer = Seq2SeqTrainer(
    args=training_args,
    model=model,
    train_dataset=librispeech["train"],
    eval_dataset=librispeech["test"],
    data_collator=data_collator,
    tokenizer=processor.feature_extractor,
    callbacks=[SavePeftModelCallback],
)
model.config.use_cache = False
trainer.train()

metric = evaluate.load("wer")

from torch.utils.data import DataLoader
from tqdm import tqdm
import numpy as np
import gc

eval_dataloader = DataLoader(librispeech["test"], batch_size=8, collate_fn=data_collator)

model.eval()
for step, batch in enumerate(tqdm(eval_dataloader)):
    with torch.no_grad():
        generated_tokens = (
            model.generate(
                input_features=batch["input_features"].to("cuda"),
                decoder_input_ids=batch["labels"][:, :4].to("cuda"),
                max_new_tokens=255,
            )
            .cpu()
            .numpy()
        )
        labels = batch["labels"].cpu().numpy()
        labels = np.where(labels != -100, labels, tokenizer.pad_token_id)
        decoded_preds = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
        decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)
        metric.add_batch(
            predictions=decoded_preds,
            references=decoded_labels,
        )
    del generated_tokens, labels, batch
    gc.collect()
wer = 100 * metric.compute()
print(f"{wer=}")
