import boto3
import urllib
import json

transcribe_client = boto3.client('transcribe', region_name = 'us-west-1', aws_access_key_id=<'access_key'>,
         aws_secret_access_key= <'secret_access_key'>

def transcribefile(jobname, file_uri, transcribe_client):
    transcribe_client.start_transcription_job(
        TranscriptionJobName = job_name,
        Media = {'MediaFileUri': file_uri},
        MediaFormat = 'wav',
        LanguageCode = 'en-US'
    )

    max_tries = 15
    while max_tries > 0:
        max_tries = -1
        job = transcribe_client.get_transcription_job(TranscriptionJobName = job_name)
        job_status = job['TranscriptionJob']['TranscriptionJobStatus']
        if job_status in ['COMPLETED', 'FAILED']:
                print(f"Job {job_name} is {job_status}.")
                if job_status == 'COMPLETED':
                    response = urllib.request.urlopen(job['TranscriptionJob']['Transcript']['TranscriptFileUri'])
                    data = json.loads(response.read())
                    text = data['results']['transcripts'][0]['transcript']
                    print("Below is the transcribed audio file")
                    print(text)
                break

def main():
     file_url = "s3://team04bucketunr/willthisswork.wav"
     transcribe_file('TESTJOBTEAM04difft', file_url, transcribe_client)

if __name == '__main':
    main(