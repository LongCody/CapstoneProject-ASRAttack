# CapstoneProject-ASRAttack
Our ASR Attack project aims to create Adversarial Examples (AE) which can be injected during an auditory command given to these smart voice devices and cause it to misclassify the given command. This is started by creating a model that would first translate audio files to make sure the correct input is received into the ASR, then noise will be added to the audio files until the ASR has a misclassified command. From here the team would create the AE’s to be used in further real-world attacks on the system. To deliver the attacks, the team plans on using a Raspberry Pi device to listen for the trigger phrase and play the AE. The ASR device will then receive the user input and misclassify the command.


AE Creation
Install Dependencies
pip install numpy scipy scikit-learn ipython sympy nose Pillow SpeechRecognition

Execute python script
Run the .py file using the following command:

python kenan_attack.py --inputfile <audio_file_path> --outputfile <outputfile> --attack <attack_name>

where:

audio_file_path - full path to the audio file
outputfile - full path to the outputfile or outfile name (if you want it in the same location as the input file)
attack - fft, ssa, dct, or overlay
