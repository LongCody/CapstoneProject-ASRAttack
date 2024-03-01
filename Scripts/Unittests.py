#from Whisper_Speech_to_Text import Whisper_Speech_to_Text
#from Whisper_WER_Test import Whisper_WER_TEST
import unittest
from unittest.mock import MagicMock, patch
import pvporcupine
from Spec_process import preprocess_spec
import os
from rpi import run_speech_func



class Test_RPI(unittest.TestCase):
    
  def test_run_speech_keywords(self):
    with patch('rpi.pvporcupine.create') as porc_mock: 
      access_key = "DXuszknRNvWjNp/jed0rQXB64vNUOyyDyoCuSIY25sQOkmO4TmmxWw==" #create access key and keywords from porcupine
      keywords = ['alexa', 'hey_google']
      porc_mock.return_value = MagicMock() #create mock return value
      pvporcupine.create(access_key=access_key, keywords=keywords)
      porc_mock.assert_called_once_with(access_key=access_key, keywords=keywords) #makes sure create method was called
          



    
 

        

if __name__ == "__main__":
  unittest.main()
  