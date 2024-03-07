import pyaudio
import pvporcupine
import struct
from pygame import mixer
import time
import random



def run_speech_func():
    
    ae = ['/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/Scripts/record_out_48000_FFT_1950767_BST.wav',
          '/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/Scripts/synthesize1_24000_FFT_1434637_BST.wav',
          '/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/Official Capstone Project/CapstoneProject-ASRAttack/Scripts/synthesize2_24000_FFT_2511508_BST.wav']
    
    mixer.init() #Initialzing pyamge mixer
    
    porcupine = None
    audio = None
    stream = None

    try:
        # Constants
        THRESHOLD = 100  # Adjust this value to set the audio threshold for reaction
        
        access_key = "DXuszknRNvWjNp/jed0rQXB64vNUOyyDyoCuSIY25sQOkmO4TmmxWw==" 
        
        porcupine = pvporcupine.create(access_key=access_key,keywords=['alexa', 'bumblebee'])

        
        # Initialize PyAudio
        audio = pyaudio.PyAudio()


        # Open the microphone stream
        stream = audio.open(format=pyaudio.paInt16,
                            channels=1,
                            rate=porcupine.sample_rate,
                            input=True,
                            frames_per_buffer=porcupine.frame_length,
                            )

        print("Listening...")

        # Continuous audio stream processing
        while True:
            # Read audio data from the stream
            data = stream.read(porcupine.frame_length)
            
            data = struct.unpack_from("h" * porcupine.frame_length, data)
            
            rms_index = porcupine.process(data)

            # Check if the RMS exceeds the threshold
            if rms_index > THRESHOLD:
                # Perform your desired reaction here
                print("Sound detected!")
                
                ae_rand = random.choice(ae)
                
                ae_play = mixer.Sound(ae_rand)

                ae_play.play() #Playing sound

                time.sleep(10)


                mixer.stop()
        
                
    finally:
    # Stop and close the microphone stream
        
        if porcupine is not None:
            porcupine.delete()
        
        #if audio is not None:
        # stream.close()
            
        if stream is not None:
            audio.terminate()
                

def main():
    
    run_speech_func()


if __name__ == "__main__":
    main()