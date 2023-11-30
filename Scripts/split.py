import os
from sklearn.model_selection import train_test_split

extracted_folder = "/home/codylong/CSFinal/voice-attack/LibriSpeech"

# List all the directories (speakers) in the dataset
speakers = os.listdir(extracted_folder)

# Split the dataset into test and evaluation sets
train_speakers, eval_speakers = train_test_split(speakers, test_size=0.2, random_state=42)

# Define paths for test and evaluation datasets
test_folder = "LibriSpeech/test"
eval_folder = "LibriSpeech/eval"

# Create directories if they don't exist
os.makedirs(test_folder, exist_ok=True)
os.makedirs(eval_folder, exist_ok=True)

# Move speakers to test and evaluation datasets
for speaker in speakers:
    source_path = os.path.join(extracted_folder, speaker)
    if speaker in train_speakers:
        destination_path = os.path.join(test_folder, speaker)
    else:
        destination_path = os.path.join(eval_folder, speaker)
    os.rename(source_path, destination_path)

print("Data splitting complete.")
