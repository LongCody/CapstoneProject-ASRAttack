import { Box, Typography, Button, Paper } from '@mui/material';
import image1 from "./images/Directions.png";
import image2 from "./images/Directions_48000_FFT_6682935_BST.png";
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        <Box sx={{ maxWidth: 'auto', margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#e0e0e0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>ASR Attack</Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="body1" paragraph>
                        Technology has advanced vastly over the past 20 years to the point where many devices take advantage of smart voice technology, from phones to physical devices which sit in your home and provide help with different tasks. These devices rely on Automatic Speech Recognition (ASR) to identify key words and phrases which trigger their functionality. In this project, the aim is to create Adversarial Examples (AE) which can be injected during an auditory command given to these smart voice devices and cause it to misclassify the given command.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        This is started by creating a model that would first translate audio files to make sure the correct input is received into the ASR, then noise will be added to the audio files until the ASR has a misclassified command. From here, the team would create the AEs to be used in further real-world attacks on the system. To deliver the attacks, the team plans on using a Raspberry Pi device to listen for the trigger phrase and play the AE. The ASR device will then receive the user input and misclassify the command.
                    </Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h4" gutterBottom>What is an ASR and what does it mean to attack one?</Typography>
                    <Typography variant="body1" paragraph>
                        ASR stands for Automatic Speech Recognition. It's a technology that allows a computer or device to transcribe spoken language into text. ASR systems are used in various applications, such as voice search, voice commands, and dictation software. They are based on complex algorithms that analyze audio input to identify and interpret spoken words.                     Attacking an ASR Devcice means creating adversarial examples that can fool the system into misclassifying spoken commands. Adversarial examples are specially crafted inputs that are designed to exploit vulnerabilities in machine learning models. By injecting adversarial examples into the ASR system, attackers can cause it to make mistakes and produce incorrect output.
                    </Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h4" gutterBottom>What does an attack look like?</Typography>
                    <Typography variant="body1" paragraph>
                        <b>Heres an example of an original transcription and an attack transcription:</b><br />
                        <br />
                        <b>Original Transcription:</b>  I'm heading to the University of Nevada, Reno. Can you give me directions and estimate how long it will take to get there?<br />
                        <b>Attack Transcription:</b>  I'm heading to the University of Miami-Dade. Can you give me directions on the estimates for any of the districts you prefer?<br />
                        <b>MSE(Mean Squared Error):</b> 0.03541786119546995
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={image1} width="600" height="300" controls />
                    </Box>
                    <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
                        <b>Spectrogram of Original Transcription</b>
                    </Typography>
                    <br />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={image2} width="600" height="300" controls />
                    </Box>
                    <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
                        <b>Spectrogram of Attack Transcription</b>
                    </Typography>
                </Paper>
                    <br />
                    <Button variant="contained" component={Link} to="/explore" sx={{ marginRight: 2 }}>Explore</Button>
                    <Button variant="outlined" component={Link} to="/about">Learn More</Button>
            </Paper>
        </Box>
    );
}