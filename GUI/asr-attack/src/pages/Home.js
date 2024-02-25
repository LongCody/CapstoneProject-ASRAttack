import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h2" gutterBottom>ASR Attack</Typography>
                <Typography variant="body1" paragraph>
                    Technology has advanced vastly over the past 20 years to the point where many devices take advantage of smart voice technology, from phones to physical devices which sit in your home and provide help with different tasks. These devices rely on Automatic Speech Recognition (ASR) to identify key words and phrases which trigger their functionality. In this project, the aim is to create Adversarial Examples (AE) which can be injected during an auditory command given to these smart voice devices and cause it to misclassify the given command.
                </Typography>
                <Typography variant="body1" paragraph>
                    This is started by creating a model that would first translate audio files to make sure the correct input is received into the ASR, then noise will be added to the audio files until the ASR has a misclassified command. From here, the team would create the AEs to be used in further real-world attacks on the system. To deliver the attacks, the team plans on using a Raspberry Pi device to listen for the trigger phrase and play the AE. The ASR device will then receive the user input and misclassify the command.
                </Typography>
                <Button variant="contained" component={Link} to="/try-it" sx={{ marginRight: 2 }}>Try It Now</Button>
                <Button variant="outlined" component={Link} to="/about">Learn More</Button>
            </Paper>
        </Box>
    );
}
