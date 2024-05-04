import boto3
import urllib
import json

transcribe_client = boto3.client('transcribe', region_name = 'us-west-1', aws_access_key_id='access_key', #AWS account access info
         aws_secret_access_key= 'secret_access_key')

def transcribefile(jobname, file_uri, transcribe_client): #Transcribes an audio file by job name in desired language and by audiofile type
    transcribe_client.start_transcription_job(
        TranscriptionJobName = job_name,
        Media = {'MediaFileUri': file_uri},
        MediaFormat = 'wav',
        LanguageCode = 'en-US'
    )

    max_tries = 15
    while max_tries > 0:
        max_tries = -1
        job = transcribe_client.get_transcription_job(TranscriptionJobName = job_name) #Gets Transcription job status
        job_status = job['TranscriptionJob']['TranscriptionJobStatus']
        if job_status in ['COMPLETED', 'FAILED']: #Checks if the job is completed or failed, if completed gets and prints transcription
                print(f"Job {job_name} is {job_status}.")
                if job_status == 'COMPLETED':
                    response = urllib.request.urlopen(job['TranscriptionJob']['Transcript']['TranscriptFileUri'])
                    data = json.loads(response.read())
                    text = data['results']['transcripts'][0]['transcript']
                    print("Below is the transcribed audio file")
                    print(text)
                break

def main():
     file_url = "s3://team04bucketunr/willthisswork.wav" #Bucket URL for audio file
     transcribefile('TESTJOBTEAM04difft', file_url, transcribe_client) #Job Detail

if __name__ == '__main':
    main()