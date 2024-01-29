import glob
import numpy as np
import time
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import torchaudio
from torchaudio.transforms import Spectrogram
from torch.utils.data import Dataset, DataLoader
import os

# Source Code Kelly Chiander

class LibriSpeechDataset(Dataset):
    char_map = {
        '<BLANK>': 0, 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10, 'K': 11,
        'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23,
        'X': 24, 'Y': 25, 'Z': 26, ' ': 27, '\'': 28
    }

    def __init__(self, root_dir, transform=None):
        self.root_dir = root_dir
        self.transform = transform
        self.file_paths = [os.path.join(root_dir, fname) for fname in os.listdir(root_dir) if fname.endswith('.pt')]
        self.transcripts = self.load_transcripts()

    def load_transcripts(self):
        transcripts = {}
        for txt_file in glob.glob(os.path.join(self.root_dir, "*.txt")):
            print(f'loading {txt_file}')
            with open(txt_file, 'r') as f:
                for line in f:
                    file_id, transcript = line.split(' ', 1)
                    transcripts[file_id] = transcript.strip()  # remove any trailing whitespace
        return transcripts

    def __len__(self):
        return len(self.file_paths)

    def __getitem__(self, index):
        path_to_pt_file = self.file_paths[index]
        spectrogram_tensor = torch.load(path_to_pt_file)

        # Extract file ID from the path and use it to get the transcript
        file_id = os.path.basename(path_to_pt_file).split('.')[0]
        label = self.transcripts[file_id]

        # Convert raw_label (a string) to a sequence of integers
        encoded_label = [self.char_map[char] for char in label]

        return spectrogram_tensor, encoded_label


def collate_fn(batch):
    # A batch is a list of tuples containing (spectrogram, label)
    spectrograms, labels = zip(*batch)

    # Find the max width (time dimension) for padding spectrograms
    max_width = max([spec.shape[2] for spec in spectrograms])
    padded_spectrograms = [F.pad(input=spec, pad=(0, max_width - spec.shape[2]), mode='constant', value=0) for spec in spectrograms]
    spectrograms = torch.stack(padded_spectrograms)

    # Encode and pad labels

    max_label_length = max([len(label) for label in labels])
    padded_labels = [label + [0]*(max_label_length - len(label)) for label in labels]  # Using 0 for padding

    return spectrograms, torch.tensor(padded_labels)


class ASRModel(nn.Module):
    def __init__(self):
        super(ASRModel, self).__init__()

        # Convolutional layers
        self.conv1 = nn.Conv2d(1, 32, kernel_size=(3,3), stride=(1,1), padding=(1,1))
        self.conv2 = nn.Conv2d(32, 64, kernel_size=(3,3), stride=(1,1), padding=(1,1))
        self.pool = nn.MaxPool2d(2, 2)  # pool after each conv layer to reduce dimensions
        self.dropout1 = nn.Dropout(0.25)

        # LSTM layers
        self.lstm = nn.LSTM(3200, 128, num_layers=2, batch_first=True, bidirectional=True)

        # Fully connected layer
        self.fc = nn.Linear(128*2, 29)  # 29 output classes

    def forward(self, x):
        # Input shape: [batch, 1, freq, time]

        # Conv layers
        x = F.relu(self.conv1(x))
        x = self.pool(x)
        x = F.relu(self.conv2(x))
        x = self.pool(x)
        x = self.dropout1(x)

        # Reshaping for LSTM (batch, sequence length, features)
        x = x.permute(0, 3, 1, 2)  # Re-ordering the dimensions for LSTM
        B, T, C, H = x.shape
        x = x.view(B, T, C*H)  # Merging the last two dimensions for LSTM input

        # LSTM layers
        x, _ = self.lstm(x)

        # Fully connected layer
        x = self.fc(x)

        return x  # Output shape: [batch, time, class_probs]


def load_data(device):
    # Set batch size depending on the device
    if device.type == 'cuda':
        batch_size = 16  # or whatever larger size fits in your GPU memory
    else:
        batch_size = 4

    spectrogram_transform = Spectrogram()

    # Instantiate the dataset and dataloader
    dataset = LibriSpeechDataset("../data/LibriSpeech/pt", transform=spectrogram_transform)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True, collate_fn=collate_fn)

    return dataset, dataloader


def init_model(device):
    # Create an instance of the neural network
    model = ASRModel().to(device)

    criterion = nn.CTCLoss(blank=0).to(device)  # using index 0 as blank label
    optimizer = optim.SGD(model.parameters(), lr=0.01)

    return model, criterion, optimizer


def train_model(dataloader, model, criterion, optimizer, device):
    NUM_EPOCHS = 5
    PRINT_INTERVAL = 100

    model.train()  # set the model to training mode
    for epoch in range(NUM_EPOCHS):
        running_loss = 0.0
        for i, (spectrograms, labels) in enumerate(dataloader, 0):
            spectrograms = spectrograms.to(device)
            labels = [label.clone().detach().to(device) for label in labels]
            concatenated_labels = torch.cat(labels)

            optimizer.zero_grad()  # zero the parameter gradients

            print(spectrograms.shape)
            outputs = model(spectrograms)
            B, T, C = outputs.shape

            log_probs = F.log_softmax(outputs, dim=2)  # Ensure that the softmax is applied over the correct dimension
            print(f'length of log_probs = {len(log_probs)}')
            print(f'shape of log_probs = {log_probs.shape}')

            # Create a tensor that contains the length of each sequence in the batch
            input_lengths = torch.full((B,), T, dtype=torch.long, device=device)
            print(f'length of input_lengths = {len(input_lengths)}')
            print(f'input_lengths = {input_lengths}')
            # Assuming outputs is your network's output with shape [batch, time, class_probs]
            # input_lengths = torch.full(size=(outputs.size(0),), fill_value=outputs.size(1), dtype=torch.long, device=device)

            # Create a tensor that contains the length of each label
            target_lengths = torch.tensor([len(label) for label in labels], dtype=torch.long, device=device)
            print(f'length of target_lengths = {len(target_lengths)}')
            print(f'target_lengths = {target_lengths}')

            print(f'concatenated_labels = {concatenated_labels}')

            assert log_probs.size(0) == input_lengths.size(0) == target_lengths.size(0) == 16 or log_probs.size(0) == input_lengths.size(0) == target_lengths.size(0) == 11

#Source Code Kelly Chiander
       
            # Mock data
            # Compute the CTC loss
            # Note: the zero index in CTC loss is reserved for the blank label

#Team Additions to get Model Working Correctly          
            log_probs = torch.randn(50, 16, 20).log_softmax(2).detach().requires_grad_()
            targets = torch.randint(1, 20, (16, 30), dtype=torch.long)
            input_lengths = torch.full((16,), 50, dtype=torch.long)
            target_lengths = torch.randint(10, 30, (16,), dtype=torch.long)
            loss = F.ctc_loss(log_probs, targets, input_lengths, target_lengths)
#Team Additions to get Model Working Correctly  

# Source Code Kelly Chiander
            loss.backward()  # backward pass
            optimizer.step()  # optimize

            running_loss += loss.item()
            

            if i % PRINT_INTERVAL == PRINT_INTERVAL - 1:  # print every PRINT_INTERVAL
                print(f'Epoch [{epoch + 1}/{NUM_EPOCHS}], Step [{i + 1}/{len(dataloader)}], Loss: {running_loss / PRINT_INTERVAL:.4f}')
                running_loss = 0.0

    print('Finished Training')


def main():
    training_times = []
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print(f'GPU available: {torch.cuda.is_available()}')

    for i in range(5):
        print(f'Training iteration: {i}')

        dataset, dataloader = load_data(device)
        model, criterion, optimizer = init_model(device)

        train_start = time.time()
        train_model(dataloader, model, criterion, optimizer, device)
        train_time = time.time() - train_start
        training_times.append(train_time)
        print(f'Training took {train_time:.2f} seconds')
# Source Code Kelly Chiander

#Team Additions to get Model Working Correctly         
        model_save_path = f"trained_model_iteration_{i}.pt"
        torch.save(model.state_dict(), model_save_path)
        print(f'Trained model saved at: {model_save_path}')
#Team Additions to get Model Working Correctly 

    avg_time = np.average(training_times)
    print(f'Times were: {training_times} seconds')
    print(f'Average time was {avg_time:.2f} seconds')


if __name__ == '__main__':
    main()
