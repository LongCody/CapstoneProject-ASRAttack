#Team 04 - Kristian Konstantinov, Cody Long, Zachary Strazi, Jacob Ayers for the University of Nevada, Reno

import whisper

#Add Feature: Input system arguement to for file name to transcribe and target .txt file transcription name
#Use this space to add feature

input_file = "example_filename.wav" #name of file to be transcribed
output_file = "example_audio_transcription.txt" #name of file being created of transcription

model = whisper.load_model("medium.en") #load whisper medium model for english only transcriptions
transcription = model.transcribe(input_file) #save transciption of file into memory as variable audioTranscription

text_transcription = transcription("text")

print(text_transcription)

#with open(output_file, "w") as output: #Write transcription into the predesignated output file name
#    output.write(text_transcription)

