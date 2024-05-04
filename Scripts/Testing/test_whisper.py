import pathlib as pl
import unittest
import Whisper_Speech_to_Text

class test_transcription_whisper(unittest.TestCase):
    
  def test_transcribe(self):
    print('testing transcription...')
    Whisper_Speech_to_Text.transcription()
    #self.assertEqual (Whisper_Speech_to_Text.transcription(), ' The stale smell of old beer lingers. It takes heat to bring out the odor. A cold dip restores health and zest. A salt pickle tastes fine with ham. Tacos al pastor are my favorite. A zestful food is the hot cross bun.')

  def check_file(self):
    print('Testing file output creation...')
    path = pl.Path("./output.txt")
    self.assertTrue(path.is_file())
    self.assertTrue(path.parent.is_dir())

if __name__ == "__main__":
  unittest.main()