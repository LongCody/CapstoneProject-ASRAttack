#sourcecode from kenansville attack https://github.com/kwarren9413/kenansville_attack/blob/master/kenan_attack.py
import speech_recognition as sr
from os import path
import os.path
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
from ssa_core import ssa, ssa_predict, ssaview, inv_ssa, ssa_cutoff_order
from os import system
from os import listdir
from os.path import isfile, join
from datasets import load_dataset
import wave
import scipy as sc
import soundfile as sf
import librosa
import IPython.display as ipd
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
import math
import librosa as lb
# from sklearn.preprocessing import normalize
import scipy
from sklearn.decomposition import PCA
import pandas as pd
from os import listdir
from os.path import isfile, join
import time
from itertools import product
import datetime
import sys
import io
import argparse
import whisper
import torch
from pydub import AudioSegment
from jiwer import wer


# NOTE: Should we remove SSA or tell them how to get it?

#Parsing commandline input flags
parser = argparse.ArgumentParser()
parser.add_argument("-ifile", "--inputfile", help="/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/Audio Commands")
parser.add_argument("-ofile","--outputfile",help="/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/Scripts/KenansvilleAttack/output.wav")
parser.add_argument("-a","--attack",help="overlay")
# parser.add_argument("","",help=)
# parser.add_argument("","",help=)

#List of comparison terms
df_attack = 'Attack'
df_attack_factor = 'Attack Factor'
df_avg_diff_frame = 'Avg Diff Frame'
df_excited = 'Excited'
df_file_name = 'File Name'
df_gsm = 'GSM'
df_gender = 'Gender'
df_l2 = 'L2'
df_model_name = 'Model Name'
df_og_label = 'OG Label'
df_og_word = 'OG Word'
df_perturb_window = 'Perturb Window'
df_phoneme = 'Phoneme'
df_raster_width = 'Raster Width'
df_succ = 'Succ'
df_temporal = 'Temporal'
df_transcribed_word = 'Transcribed Word'
df_zero_locs = 'Zero Locs'

# Attacks
floor_atk_name = 'floor'
dct_atk_name = 'dct'
fft_atk_name = 'fft'
dct_base_atk_name = 'dct_base'
svd_atk_name = 'svd'
ssa_atk_name = 'ssa'
pca_atk_name = 'pca'
sin_atk_name = 'sin'
overlay_atk_name = 'overlay'

# Models 
google_phone = 'google_phone'
wit = 'wit'
sphinx = 'sphinx'
deepspeech = 'deepspeech'
google = 'google'
whisper_medium = 'whisper_medium'
wav2vec = 'wav2vec'

#Defenses
quantization = "quantization"

def transcribe(my_path,model):

    # use the audio file as the audio source
    r = sr.Recognizer()
    with sr.AudioFile(my_path) as source:
        audio = r.record(source)  # read the entire audio file
    
    if(model == google or model == deepspeech):
        # Google
        try:
            return r.recognize_google(audio)
        except sr.UnknownValueError:
            return "None"#print("Google: -_-")
        except sr.RequestError as e:
           print("Google error; {0}".format(e))
           
    #Contribution of team_____________________________________________________________________________________________________________________
    if model == whisper_medium:
        whisp = whisper.load_model("medium.en")
        # Convert AudioData to NumPy array
        transcription = whisp.transcribe(my_path)
        text_transcription = transcription["text"]
        if "text" in transcription:
            return text_transcription
        else:
            return "None"
        
    if model == wav2vec:
 
        # load model and tokenizer
        processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
        model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")
     
        # load dummy dataset and read soundfiles
        audio = my_path
        audio, rate = librosa.load(audio, sr=16000)
        # tokenize
        input_values = processor(audio, return_tensors="pt", sampling_rate = 16_000).input_values  # Batch size 1
 
        # retrieve logits
        logits = model(input_values).logits
 
        # take argmax and decode
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = processor.batch_decode(predicted_ids)
        return transcription[0] if transcription else None

        #print(transcription)
    #___________________________________________________________________________________________________________________________

def normalize(data):
    normalized = data.ravel()*1.0/np.amax(np.abs(data.ravel()))
    magnitude = np.abs(normalized)
    return magnitude

# MSE between audio samples
def diff_avg(audio1,audio2):
    # Normalize
    n_audio1 = normalize(audio1)
    n_audio2 = normalize(audio2)
    
    # Diff
    diff = n_audio1 - n_audio2
    abs_diff = np.abs(diff)
    overall_change = sum(abs_diff)
    average_change = overall_change/len(audio1)
    return average_change

# L2 difference between audio samples
def diff_l2(audio1,audio2):
    # Normalize
    n_audio1 = normalize(audio1)
    n_audio2 = normalize(audio2)
    l2 = np.linalg.norm(n_audio2-n_audio1,2)
    return l2


def fft_compression(path,audio_image,factor,fs):
    '''
    # DFT Attack
    # path: path to audio file
    # Audio_image: audio file as an np.array object
    # factor: the intensity below which you want to zero out
    # fs: sample rate
    '''
    # Take FFT
    fft_image = sc.fftpack.fft(audio_image.ravel())
    
    # Zero out values below threshold
    fft_image[abs(fft_image) < factor] = 0
    
    # inverse fft
    ifft_audio = sc.fftpack.ifft(fft_image).real
    
    # New file name
    new_audio_path = path[0:-4]+'_'+str(fs)+'_FFT_'+str(factor)+'.wav'
    return new_audio_path, np.asarray(ifft_audio,dtype=np.int16)

#Contribution of team_____________________________________________________________________________________________________________________
def dct_compression(path, audio_image, factor, fs):
    '''
    DCT Attack
    path: path to audio file
    Audio_image: audio file as an np.array object
    factor: the intensity below which you want to zero out
    fs: sample rate
    '''
    # Take DCT
    dct_image = sc.fftpack.dct(audio_image.ravel(), norm='ortho')
    
    # Zero out values below threshold
    dct_image[abs(dct_image) < factor] = 0
    
    # inverse DCT
    idct_audio = sc.fftpack.idct(dct_image, norm='ortho').real
    
    # New file name
    new_audio_path = path[0:-4] + '_' + str(fs) + '_DCT_' + str(factor) + '.wav'
    return new_audio_path, np.asarray(idct_audio, dtype=np.int16)

def overlay_compression(path, audio_image, factor, fs):
    
    '''
    Overlay Attack
    # path: path to audio file
    # Audio_image: audio file as an np.array object
    # factor: the intensity below which you want to zero out
    # fs: sample rate
    '''
    
    audio = AudioSegment.from_file("/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/Audio Commands/lib25.wav")
    
    audio_up = audio #Increase overlay audio 
    
    audio_seg = AudioSegment(data=audio_image.tobytes(), sample_width=audio_image.dtype.itemsize, frame_rate = fs, channels = 1) #Convert Audio Image to Audio Segment
    combined_audio = audio_seg.overlay(audio_up) #Overlay original audio with another audio file
    
    
    new_audio_path = path[0:-4]+'_'+str(fs)+'_Overlay_'+str(factor)+'.wav' #New File namme
    return new_audio_path, np.asarray(combined_audio.get_array_of_samples(),dtype=np.int16)

#_________________________________________________________________________________________________________________________________________________________

def ssa_compression(path,audio_image,factor,fs,percent = True, pc=None,v=None):
    '''
    # SSA Attack
    # path: path to audio file
    # Audio_image: audio file as an np.array object
    # factor: the total percent of the lowest SSA componenets you want to discard
    # pc: first element that the ssa(data, window). Pass it to make execution fase
    # v: third element that the ssa(data, window). Pass it to make execution fase
    # fs: sample rate
    '''
    data = audio_image.ravel()
    window = int(len(data)*0.05)
    print('Factor Initial: '+str(factor))
    if(window>3000):
        window = 3000
    if(percent):
        factor = int((window)*factor/100)
    factor = 1 if(factor == 0) else int(factor)
    print('Factor Percent: '+str(factor))
    if type(pc) is not np.ndarray:
        pc, s, v = ssa(data, window)
    print('Factor for K: '+str(factor))
    reconstructed = inv_ssa(pc, v, np.arange(0,factor,1))
    new_audio_path = path[0:-4]+'_SSA_'+str(factor)+'.wav'
    return new_audio_path, np.asarray(reconstructed,dtype=np.int16).ravel(),pc,v

def perturb(og_audio_path,
            audio,
            atk_name,
            fs, 
            factor,
            raster_width,
            pc=None,
            v=None,
         ):
    frame = audio  
    if(atk_name == ssa_atk_name):
        return ssa_compression(og_audio_path,frame,factor,fs,pc = pc,v =v)

    elif(atk_name == fft_atk_name):
        path, perturbed_frame= fft_compression(og_audio_path,frame,factor,fs)
        
        return path, perturbed_frame.ravel()

    elif (atk_name == dct_atk_name):  
        path, perturbed_frame = dct_compression(og_audio_path, frame, factor, fs)

        return path, perturbed_frame.ravel()

    elif (atk_name == overlay_atk_name):  
        path, perturbed_frame = overlay_compression(og_audio_path, frame, factor, fs)
        
        return path, perturbed_frame.ravel()

def bst_atk_factor(min_atk,max_atk,val_atk,atk_name,og_label,atk_label):
    '''
    # For searching the best attack factor using binary search
    # For DCT, decrease factor if evasion success, increase other wise
    # For SSA, SVD and PCA, increase factor if evasion success, decrease other wise
    '''
    if(atk_label == og_label):
        succ = False
    else:
        succ = True
    
    init_val_atk = val_atk
    if(atk_name == dct_atk_name or atk_name == fft_atk_name or atk_name == floor_atk_name):
        if(succ):
            max_atk = val_atk
            val_atk = np.abs(min_atk+max_atk)/2
            
        else:
            min_atk = val_atk
            val_atk = np.abs(min_atk+max_atk)/2
            
    elif(atk_name == overlay_atk_name or atk_name == svd_atk_name or atk_name == ssa_atk_name):
        if(succ):
            min_atk = val_atk
            val_atk = np.abs(min_atk+max_atk)/2
            
        else:
            max_atk = val_atk
            val_atk = np.abs(min_atk+max_atk)/2
            
    
    return int(min_atk),int(max_atk),int(val_atk),(init_val_atk==val_atk) 

def atk_bst(audio_path,write_location,audio_files,raster_width,models,attack):

        
    _raster_width = raster_width[0]
    _model = models[0]
    _attack_name = attack[0]
    
    # pick audio to perturb
    og_audio_path = audio_path

    og_label = transcribe(og_audio_path,_model)
    

    # Read file to attack
    fs, data = scipy.io.wavfile.read(og_audio_path)

    # Some times audio samples have two tracks
    # just get one track
    data = data[:,0] if(len(data.shape) != 1) else data

    # Copy data to a new mutable variables
    perturbed_audio = np.copy(data)
    mistranscribed_audio = np.copy(data)
    # This is the frame we will be attacking
    frame_to_perturb = data

    # Need the min var for BST
    min_attack_factor = 0

    # Max factor for perturbation
    max_attack_factor = _raster_width if (_attack_name != dct_atk_name) else 8000
    max_attack_factor = max(abs(sc.fftpack.fft(data))) if (_attack_name == fft_atk_name) else max_attack_factor
    _attack_factor= max_attack_factor/2

    # For ssa
    pc = v = None

    # Maximum iterations
    if(_attack_name == ssa_atk_name):
        max_allowed_iterations = 15
    if(_attack_name == fft_atk_name):
        max_allowed_iterations = 15
    if(_attack_name == dct_atk_name):
        max_allowed_iterations = 15
    if(_attack_name == overlay_atk_name):
        max_allowed_iterations = 1

    # Initialize iteration counter
    itr = 0

    # For each iteration
    # Generate attack sample using the _attack_factor
    # if attack works reduce max_attack_factor and min_attack_factor
    # if attack does not work increase max_attack_factor and min_attack_factor
    # Save only the attack file that works to the dataframe

    while(itr < max_allowed_iterations):
        # This variable is written to the dataframe to show the last iteration
        bst = False
        _window_size = 100
        # Attack!!
        atk_result = perturb(og_audio_path,
            audio = frame_to_perturb,
            atk_name = _attack_name,
            fs = fs, 
            factor = _attack_factor,
            raster_width = _raster_width,
                             pc = pc,
                             v = v,
         )
        # Recycling pc and v to reduce computation time
        if(_attack_name == ssa_atk_name):
            perturbed_audio_path, perturbed_audio_frame, pc,v = atk_result
        else:
            perturbed_audio_path, perturbed_audio_frame = atk_result


        perturbed_audio_path = perturbed_audio_path[:-4]+'_BST.wav'
        perturbed_audio[0:len(perturbed_audio_frame)] = \
        perturbed_audio_frame




        # Write perturbed audio
        scipy.io.wavfile.write(perturbed_audio_path, fs , perturbed_audio.ravel())
        
        # Transcribe
        transcribed_perturbation = transcribe(perturbed_audio_path,_model)                 
        # Delete newly created audio
        del_tmp = 'rm '+ perturbed_audio_path
        system(del_tmp)

        if(og_label != transcribed_perturbation):
            mistranscribed_audio = perturbed_audio
    
        # Adjust max and min factor varaibles
        new_min_attack_factor,new_max_attack_factor,new_attack_factor,complete = \
        bst_atk_factor(min_atk = min_attack_factor ,max_atk = \
                       max_attack_factor ,val_atk = _attack_factor \
                       ,atk_name = _attack_name ,og_label = og_label ,atk_label = transcribed_perturbation)


        min_attack_factor,max_attack_factor,_attack_factor = \
            new_min_attack_factor,new_max_attack_factor,new_attack_factor 

        # Distances between original and perturbe audio file
        l2 = diff_l2(data,perturbed_audio)
        avg = diff_avg(data,perturbed_audio)
        if transcribed_perturbation is None:
            transcribed_perturbation = 'None'
            
        
        print('Iteration #: ' + str(itr+1))
        print('\t'*2 + 'Original Transcription: ' + og_label)
        print('\t'*2 + 'Attack Transcription: ' + transcribed_perturbation)
        print('\t'*2 + 'MSE: ' + str(avg))
        


        itr = itr + 1
        if(complete): break
    print('*'*80)
    print("Complete")
    scipy.io.wavfile.write(write_location, fs , mistranscribed_audio.ravel())


if __name__ == '__main__':
    
    args = parser.parse_args()
    
    # Path to audio files
    audio_path = args.inputfile
    if args.outputfile.__contains__('/'):
        write_location = args.outputfile
    else:
        write_location = args.inputfile.replace(args.inputfile.split('/')[-1],args.outputfile)
        
    # Create folder if it does not exist
    if(not os.path.isdir(write_location.replace(write_location.split('/')[-1],''))):
        os.makedirs(write_location.replace(write_location.split('/')[-1],''))
   

    audio_file = args.inputfile.split('/')[-1]
    raster_width = [100]

    models = [whisper_medium]
    attack = [args.attack]
    start = datetime.datetime.now()
    # Run attack
    print('*'*80)
    atk_bst(audio_path,write_location,audio_file,raster_width,models,attack)
    end = datetime.datetime.now()

    delta =  end - start
    print('Total Time '+str(delta))
    