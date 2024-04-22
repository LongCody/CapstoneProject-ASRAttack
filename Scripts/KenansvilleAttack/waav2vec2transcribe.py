import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import soundfile as sf
from jiwer import wer

# Load your audio file (replace 'your_audio.wav' with the actual file path)
#input_file = "/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/Audio Commands/lib60.wav"
input_file = "/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/AEs/Whisper/lib60_16000_Overlay_50.0_BST.wav"
data, samplerate = sf.read(input_file)

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


expected_text = "THIS CHANGE CAME ABOUT FROM AN ADVENTURE WE HAD TOGETHER"
transcribed_text = " ".join(transcription)

# Word Error Rate (WER)
word_er = wer(expected_text.lower(), transcribed_text.lower())
print("WER:", word_er)
