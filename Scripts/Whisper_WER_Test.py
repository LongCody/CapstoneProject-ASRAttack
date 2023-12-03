#Sourcecode from Hugging Face @ https://huggingface.co/openai/whisper-medium for testing purposes

from datasets import load_dataset
from transformers import WhisperForConditionalGeneration, WhisperProcessor
import torch
from evaluate import load
import torch
from transformers import pipeline
from datasets import load_dataset



def map_to_pred(batch):
    audio = batch["audio"]
    input_features = processor(audio["array"], sampling_rate=audio["sampling_rate"], return_tensors="pt").input_features
    batch["reference"] = processor.tokenizer._normalize(batch['text'])

    with torch.no_grad():
        predicted_ids = model.generate(input_features.to("cuda"))[0]
    transcription = processor.decode(predicted_ids)
    batch["prediction"] = processor.tokenizer._normalize(transcription)
    return batch

if __name__ == "__main__":

    librispeech_test_clean = load_dataset("librispeech_asr", "clean", split="test")

    processor = WhisperProcessor.from_pretrained("openai/whisper-medium.en")

    model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-medium.en").to("cuda")

    result = librispeech_test_clean.map(map_to_pred)

    device = "cuda:0" if torch.cuda.is_available() else "cpu"

    pipe = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-medium.en",
    chunk_length_s=30,
    device=device,
    )

    ds = load_dataset("hf-internal-testing/librispeech_asr_dummy", "clean", split="validation")
    sample = ds[0]["audio"]

    prediction = pipe(sample.copy(), batch_size=8)["text"]
    " Mr. Quilter is the apostle of the middle classes, and we are glad to welcome his gospel."

    # we can also return timestamps for the predictions
    prediction = pipe(sample.copy(), batch_size=8, return_timestamps=True)["chunks"]
    [{'text': ' Mr. Quilter is the apostle of the middle classes and we are glad to welcome his gospel.',
    'timestamp': (0.0, 5.44)}]

    wer = load("wer")
    print(100 * wer.compute(references=result["reference"], predictions=result["prediction"]))
