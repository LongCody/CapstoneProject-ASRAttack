from kenan_attack import transcribe
import unittest


class Test_Kenansville(unittest.TestCase):
  
  def test_transcribe_google(self):
    path = 'wsl.localhost/Ubuntu/home/cjcclong/git/CapstoneProject-ASRAttack/Scripts/KenansvilleAttack/example_filename.wav'
    
    transcription = "the stale smell of old beer lingers it takes heat to bring out the odor a cold dip restores health and zest a salt pickle taste fine with ham tacos al pastor are my favorite a zestful food is the hot cross bun"
    
    result = transcribe(path, 'google')

    self.assertEqual(result, transcription)