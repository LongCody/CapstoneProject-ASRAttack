import os
import torchaudio
from torchaudio.transforms import Spectrogram
import torch

PRINT_INTERVAL = 500


def preprocess_audio(root_dir, output_dir):
    """
    Converts audio files from LibriSpeech dataset to spectrograms and saves them as .pt files.

    Args:
        root_dir (str): Path to the root directory of the LibriSpeech dataset.
        output_dir (str): Directory where the processed spectrogram tensors will be saved.
    """

    spectrogram_transform = Spectrogram()
   #torchaudio.set_audio_backend("soundfile")

    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    file_count = 1

    # Walk through the directory structure
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            file_path = os.path.join(subdir, file)
            if file_count % PRINT_INTERVAL == PRINT_INTERVAL - 1:  # print every PRINT_INTERVAL
                print(f"processing file {file_path}")

            if file.endswith('.flac'):
                waveform, sample_rate = torchaudio.load(file_path, format="flac")
                spectrogram = spectrogram_transform(waveform)

                pt_output_path = os.path.join(output_dir, file.replace('.flac', '.pt'))
                wav_output_path = os.path.join(output_dir, file.replace('.flac', '.pt_wav'))
                torch.save(spectrogram, pt_output_path)
                torch.save(waveform, wav_output_path)

            elif file.endswith('.txt'):
                output_path = os.path.join(output_dir, file)
                with open(file_path, 'r') as f_in, open(output_path, 'w') as f_out:
                    f_out.write(f_in.read())

            file_count += 1


if __name__ == "__main__":
    root_dir = "/home/codylong/CSFinal/voice-attack/LibriSpeech/train-clean-100"    #Directory where Librispeech data is stored
    output_dir = "../data/LibriSpeech/pt"
    preprocess_audio(root_dir, output_dir)
    
