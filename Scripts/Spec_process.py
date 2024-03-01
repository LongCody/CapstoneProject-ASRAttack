import os
import soundfile as sf
import matplotlib.pyplot as plt
from matplotlib import mlab
import numpy as np

PRINT_INTERVAL = 500

def preprocess_spec(root_dir, output_dir): # Walks through the directory and then processes the .flac file and turns them into spectrograms as a .png file ans saves them in a new directory
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    file_count = 1

    for subdir, dir, files in os.walk(root_dir):
        for file in files:
            file_path = os.path.join(subdir, file)
            print(f"Processing file: {file_path}")

            if file.endswith('.flac'):
                data, samplerate = sf.read(file_path) # If file ends with .flac process

                # Calculate the spectrogram
                Pxx, freqs, bins = mlab.specgram(data, NFFT=1024, Fs=samplerate, noverlap=512)

                # Save the spectrogram as an image file
                spec_output_path = os.path.join(output_dir, file.replace('.flac', '.png'))
                plt.pcolormesh(bins, freqs, 10 * np.log10(Pxx))  # Plot in dB scale
                plt.axis('off')
                plt.savefig(spec_output_path, bbox_inches='tight', pad_inches=0)
          

            elif file.endswith('.txt'): # Writes the text transcription
                output_path = os.path.join(output_dir, file)
                with open(file_path, 'r') as f_in, open(output_path, 'w') as f_out:
                    f_out.write(f_in.read())

            file_count += 1


if __name__ == "__main__":
    root_dir = "../Project test/dev-clean/LibriSpeech/dev-clean"
    output_dir = "../spectrogram/png"
    preprocess_spec(root_dir, output_dir)