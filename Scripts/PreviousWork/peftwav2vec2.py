import os
import torch
import evaluate
import numpy as np
from torch.utils.data import DataLoader
from tqdm import tqdm
from datasets import load_dataset, Audio,  DatasetDict, load_metric
from dataclasses import dataclass, field
from peft import LoraConfig, PeftModel, LoraModel, get_peft_model
from typing import Any, Dict, List, Optional, Union
from transformers.trainer_utils import PREFIX_CHECKPOINT_DIR
from transformers import AutoFeatureExtractor, AutoTokenizer, AutoProcessor, TrainerCallback, TrainerState, TrainerControl
from transformers import Wav2Vec2ForCTC, TrainingArguments, Trainer
from transformers import Wav2Vec2Processor
import types
from accelerate import DistributedDataParallelKwargs
from accelerate import Accelerator
from accelerate.logging import get_logger
import logging

from torch.utils.data import DataLoader
from tqdm import tqdm
import numpy as np
import gc

logging.basicConfig(level=logging.INFO)
logger = get_logger(__name__)
wer_metric = load_metric("wer")

def prepare_dataset(batch):
    audio = batch["audio"]
    batch["input_features"] = feature_extractor(audio["array"], sampling_rate=audio["sampling_rate"]).input_values[0] # not input_features
    batch["labels"] = tokenizer(batch["text"]).input_ids
    return batch

def print_trainable_parameters(model):
    trainable_params = 0
    all_param = 0
    for _, param in model.named_parameters():
        all_param += param.numel()
        if param.requires_grad:
            trainable_params += param.numel()
    logger.info(f"trainable params: {trainable_params} || all params: {all_param} || trainable%: {100 * trainable_params / all_param:.2f}",
                main_process_only=True)

@dataclass
class DataCollatorCTCWithPadding:
    processor: Wav2Vec2Processor
    padding: Union[bool, str] = True
    max_length: Optional[int] = None
    max_length_labels: Optional[int] = None
    pad_to_multiple_of: Optional[int] = None
    pad_to_multiple_of_labels: Optional[int] = None

    def __call__(self, features: List[Dict[str, Union[List[int], torch.Tensor]]]) -> Dict[str, torch.Tensor]:
        # split inputs and labels since they have to be of different lenghts and need
        # different padding methods
        input_features = [{"input_values": feature["input_features"]} for feature in features]
        label_features = [{"input_ids": feature["labels"]} for feature in features]

        batch = self.processor.pad(
            input_features,
            padding=self.padding,
            max_length=self.max_length,
            pad_to_multiple_of=self.pad_to_multiple_of,
            return_tensors="pt",
        )
        with self.processor.as_target_processor():
            labels_batch = self.processor.pad(
                label_features,
                padding=self.padding,
                max_length=self.max_length_labels,
                pad_to_multiple_of=self.pad_to_multiple_of_labels,
                return_tensors="pt",
            )

        # replace padding with -100 to ignore loss correctly
        labels = labels_batch["input_ids"].masked_fill(labels_batch.attention_mask.ne(1), -100)

        batch["labels"] = labels

        return batch

def compute_metrics(pred):
    with torch.no_grad():
        logits = pred.predictions
    pred_ids = np.argmax(logits, axis=-1)
    pred.label_ids[pred.label_ids == -100] = processor.tokenizer.pad_token_id
    wer = wer_metric.compute(predictions=processor.batch_decode(pred_ids)[0],
                             references=processor.decode(pred.label_ids, group_tokens=False))
    return {"wer": wer}

def map_to_result(batch):
  with torch.no_grad():
    input_values = torch.tensor(batch["input_features"], device="cuda").unsqueeze(0)
    logits = model(input_values).logits

  pred_ids = torch.argmax(logits, dim=-1)
  batch["pred_str"] = processor.batch_decode(pred_ids)[0]
  batch["text"] = processor.decode(batch["labels"], group_tokens=False)
  
  return batch

# os.environ["CUDA_VISIBLE_DEVICES"] = "0"
model_name_or_path = "facebook/wav2vec2-base"
task = "transcribe"
dataset_name = "librispeech_asr"

# accelerate
ddp_kwargs = DistributedDataParallelKwargs(find_unused_parameters=True)
accelerator = Accelerator(kwargs_handlers=[ddp_kwargs])
device = accelerator.device

librispeech = DatasetDict()
librispeech = load_dataset(dataset_name, split = "train.clean.100")
# librispeech = load_dataset(dataset_name, split = "validation.clean")
librispeech = librispeech.train_test_split(test_size=0.2)

feature_extractor = AutoFeatureExtractor.from_pretrained(model_name_or_path)
tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, task=task)
processor = AutoProcessor.from_pretrained(model_name_or_path, task=task)

librispeech = librispeech.remove_columns(["file", "speaker_id", "chapter_id", "id"])

with accelerator.main_process_first():
    librispeech = librispeech.map(prepare_dataset, remove_columns=librispeech.column_names["train"], num_proc=8) # changed from 2 to 8 processors

    data_collator = DataCollatorCTCWithPadding(processor=processor, padding=True)

model = Wav2Vec2ForCTC.from_pretrained(
    "facebook/wav2vec2-base", 
    ctc_loss_reduction="mean", 
    pad_token_id=processor.tokenizer.pad_token_id,
)

model.config.forced_decoder_ids = None
model.config.suppress_tokens = []

peft_config = LoraConfig(inference_mode=False, 
                         r=8, 
                         lora_alpha=32, 
                         lora_dropout=0.1, 
                         target_modules=["k_proj", "q_proj"],
                         task_type="Seq2Seq")
def get_input_embeddings(self):
    return self.base_model.encoder.pos_conv_embed
model.base_model.get_input_embeddings = types.MethodType(get_input_embeddings, model)
model = get_peft_model(model, peft_config)
print_trainable_parameters(model)
# accelerator
model = accelerator.prepare(model)

training_args = TrainingArguments(
    output_dir="tni-lab/peft-facebook-wav2vec2-base-asr",
    per_device_train_batch_size=16,
    gradient_accumulation_steps=1,
    learning_rate=1e-3,
    # warmup_steps=50,
    num_train_epochs=50,
    evaluation_strategy="epoch",
    fp16=True,
    per_device_eval_batch_size=32,
    logging_steps=1,
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
        unwrapped_model = accelerator.unwrap_model(kwargs["model"])
        unwrapped_model.save_pretrained(peft_model_path,
                                        is_main_process=accelerator.is_main_process,
                                        save_function=accelerator.save)

        pytorch_model_path = os.path.join(checkpoint_folder, "pytorch_model.bin")
        if os.path.exists(pytorch_model_path):
            os.remove(pytorch_model_path)
        return control

trainer = Trainer(
    args=training_args,
    model=model,
    train_dataset=librispeech["train"],
    eval_dataset=librispeech["test"],
    data_collator=data_collator,
    tokenizer=processor.feature_extractor,
    #compute_metrics=compute_metrics,
    callbacks=[SavePeftModelCallback],
)
if hasattr(model, 'module'):
    model.module.config.use_cache = False
else:
    model.config.use_cache = False

trainer.train()
# Evaluate
results = librispeech["test"].map(map_to_result, remove_columns=librispeech["test"].column_names)
print("Test WER: {:f}%".format(wer_metric.compute(predictions=results["pred_str"], references=results["text"])/len(results["text"])*100))