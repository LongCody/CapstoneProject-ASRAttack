# CapstoneProject-ASRAttack
Our ASR Attack project aims to create Adversarial Examples (AE) which can be injected during an auditory command given to these smart voice devices and cause it to misclassify the given command. This is started by creating a model that would first translate audio files to make sure the correct input is received into the ASR, then noise will be added to the audio files until the ASR has a misclassified command. From here the team created the AE’s using the Kenansville Attack as a base and adding additional attacks to be used in further real-world attacks on the system. To deliver the attacks, the team is using a Raspberry Pi device to listen for the trigger phrase and play the AE. The ASR device will then receive the user input and misclassify the command.

# Translation 

# Whisper

Install dependencies

pip install whisper

Execute Python script- python3 Whisper_Speech_To_Text.py

# Wav2Vec2

Install dependencies

pip install Wav2Vec2ForCTC Wav2Vec2Processor

Execute python script- python3 waav2vec2transcribe.py

# Deepspeech

Install dependencies

pip install deepspeech
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer

python3 DeepspeechTranslation.py

# AE Creation

Install Dependencies

pip install numpy scipy scikit-learn ipython sympy nose Pillow SpeechRecognition whisper Wav2Vec2ForCTC Wav2Vec2Processor torch Audio Segment

Execute python script

Run the .py file using the following command:

python kenan_attack.py --inputfile <audio_file_path> --outputfile <outputfile> --attack <attack_name>

where:

# GUI

audio_file_path - full path to the audio file

outputfile - full path to the outputfile or outfile name (if you want it in the same location as the input file)

attack - fft, ssa, dct, or overlay
