import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
from datasets import load_dataset
import soundfile as sf

ds = load_dataset("patrickvonplaten/librispeech_asr_dummy", "clean", split="validation")

# Load your audio file (replace 'your_audio.wav' with the actual file path)
audio_file = ds[0]
data, samplerate = sf.read(audio_file)

# Initialize the processor
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")

# Convert audio data to input values
input_values = processor(data, return_tensors="pt", sampling_rate=samplerate, padding="longest").input_values

# Load the pre-trained model
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")

# Get logits and decode
with torch.no_grad():
    logits = model(input_values).logits
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)

print("Transcription:", transcription)
