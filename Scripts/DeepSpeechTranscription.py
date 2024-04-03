from deepspeech import Model
import numpy as np
import wave

# Load the pre-trained model
model_path = "/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Project test/deepspeech-0.9.3-models.pbmm"
scorer_path = "/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Project test/deepspeech-0.9.3-models.scorer"
ds = Model(model_path)
ds.enableExternalScorer(scorer_path)


audio_path = "/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Project test/outputaudio.wav"

with wave.open(audio_path, "rb") as audio_file: # Load an audio file
    audio_data = audio_file.readframes(audio_file.getnframes())


audio = np.frombuffer(audio_data, np.int16) #Pull audio from buffer
transcription = ds.stt(audio)


print(transcription) #Print Transcription

