#Team 04 - Kristian Konstantinov, Cody Long, Zachary Strazi, Jacob Ayers for the University of Nevada, Reno

import whisper

#Add Feature: Input system arguement to for file name to transcribe and target .txt file transcription name
#Use this space to add feature
def transcription():
    input_file = "/mnt/c/Users/zstra/OneDrive/Documents/Cs 425/PROJECT RESOURCES/Project test/AE/song/record_out_48000_FFT_3901535_BST.wav"
    output_file = "output.txt" #name of file being created of transcription
    #add expected_audio_output transcription file

    ASR_model = whisper.load_model("medium.en") #load whisper medium model for english only transcriptions
    transcription = ASR_model.transcribe(input_file) #save transciption of file into memory as variable audioTranscription

    text_transcription = transcription["text"] #saves the text transcription as a readable string
    #compare if the transcription matches the expected output

    #print(text_transcription) #print to test out speech to text functionality

    with open(output_file, "w") as output: #Write transcription into the predesignated output file name
        output.write(text_transcription)
        output.close()


    print(text_transcription)

if __name__ == "__main__":
    transcription()