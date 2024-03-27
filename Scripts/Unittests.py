#from Whisper_Speech_to_Text import Whisper_Speech_to_Text
#from Whisper_WER_Test import Whisper_WER_TEST
import unittest
from unittest.mock import MagicMock, patch
import pvporcupine
from Spec_process import preprocess_spec
import os
from Raspberry_PI import run_speech_func
import sys
sys.path.append('/home/cjcclong/git/CapstoneProject-ASRAttack/Scripts/KenansvilleAttack')
from KenansvilleAttack.kenan_attack import transcribe
from Spec_process import preprocess_spec




class Test_RPI(unittest.TestCase):
  
    
  def test_keywords(self):
    result = run_speech_func()
    self.assertTrue(result)
    self.assertIn("hey google", result) #Asserts that hey google called
    self.assertNotIn("hello", result) #Asserts word is not in result
  
  def test_run_speech_keywords(self):
    with patch('rpi.pvporcupine.create') as porc_mock: 
      access_key = "DXuszknRNvWjNp/jed0rQXB64vNUOyyDyoCuSIY25sQOkmO4TmmxWw==" #create access key and keywords from porcupine
      keywords = ['alexa', 'hey_google']
      porc_mock.return_value = MagicMock() #create mock return value
      pvporcupine.create(access_key=access_key, keywords=keywords)
      porc_mock.assert_called_once_with(access_key=access_key, keywords=keywords) #makes sure create method was called


class Test_Kenansville(unittest.TestCase):
  
  def test_transcribe_google(self):
    path = '/home/cjcclong/seniorproject/example_filename.wav'
    
    transcription = "the stale smell of old beer lingers it takes heat to bring out the odor a cold dip restores health and zest a salt pickle taste fine with ham tacos al pastor are my favorite a zestful food is the hot cross bun"
    
    result = transcribe(path, 'google')

    self.assertEqual(result, transcription)


class Test_Spec_dir_creation(unittest.TestCase):
  
  def test_create_folder(self):
    root_dir = "/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/Audio Commands"
    output_dir = "/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/Audio Commands/spectrograms"
    
    preprocess_spec(root_dir, output_dir)
    dir = "spectrogram"
    self.assertTrue(os.path.exists(dir))
    
 

        

if __name__ == "__main__":
  unittest.main()
  