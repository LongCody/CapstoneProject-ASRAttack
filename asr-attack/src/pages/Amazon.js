import { Box, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import image11 from "./AEs/Amazon/text_overlay/Original/text_overlay.png";
import image12 from "./AEs/Amazon/text_overlay/Attack/text_overlay.png";
import image21 from "./AEs/Amazon/food_fft/Original/food_fft.png";
import image22 from "./AEs/Amazon/food_fft/Attack/food_fft.png";
import wav11 from "./AEs/Amazon/text_overlay/Original/text_overlay.wav";
import wav12 from "./AEs/Amazon/text_overlay/Attack/text_overlay.wav";
import wav21 from "./AEs/Amazon/food_fft/Original/food_fft.wav";
import wav22 from "./AEs/Amazon/food_fft/Attack/food_fft.wav";

export default function Amazon() {

    const [selectedOption, setSelectedOption] = useState('');
    const [fileList, setFileList] = useState({
        'Text Overlay': {
            pngFiles: [image11, image12],
            wavFiles: [wav11, wav12],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  I need to send a text message to John can you text him I completed my part of the project<br />
            <b>Attack Transcription:</b>  I'm curious. I need to send a text message to John. Did you part of the project?<br />
            </Typography>
        },
        'Food FFT': {
            pngFiles: [image21, image22],
            wavFiles: [wav21, wav22],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  the stale smell of old beer lingers it takes heat to bring out the odor a cold dip restores health and zest a salt pickle taste fine with ham tacos al pastor are my favorite a zestful food is the hot cross bun<br />
            <b>Attack Transcription:</b>  The sour smell of old beer lingers. It takes heat to bring out the odor. A cold dip restores health and zest. A salt pickle tastes fine with ham tacos. El Pastor are my favorite. A zestful food is the hot Cross bun.<br />
            <b>MSE:</b> <br />
            </Typography>
        }
    });

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handlePlayButtonClick = (wavFile) => {
        const audio = new Audio(wavFile);
        audio.play();
        console.log(`Playing ${wavFile}`);
    };

    return (
        <Box sx={{ maxWidth: 'auto', margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#e0e0e0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>Explore</Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Select an ASR model to explore some of the Adversarial Examples created for attacking them.</Typography>
                </Paper>
                <br />
                <Paper sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Button variant="contained" component={Link} to="/amazon" sx={{ flex: 1, textAlign: 'center' }}>Amazon</Button>
                    <Button variant="contained" component={Link} to="/google" sx={{ flex: 1, textAlign: 'center' }}>Google</Button>
                    <Button variant="contained" component={Link} to="/wav2vec" sx={{ flex: 1, textAlign: 'center' }}>Wav2Vec2</Button>
                    <Button variant="contained" component={Link} to="/whisper" sx={{ flex: 1, textAlign: 'center' }}>Whisper</Button>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Google</Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="audio-select-label">Select Transcription</InputLabel>
                        <Select value={selectedOption} onChange={handleSelectChange}>
                            <MenuItem value="Text Overlay">Text Overlay</MenuItem>
                            <MenuItem value="Food FFT">Food FFT</MenuItem>
                        </Select>
                    </FormControl>
                    {selectedOption && (
                        <Grid><Typography variant="body1" gutterBottom>{fileList[selectedOption].txtFile}</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <img src={fileList[selectedOption].pngFiles[0]} alt="PNG Image 1" style={{ maxWidth: '100%', height: 'auto' }} />
                                    <Typography variant="body1" gutterBottom><b>Spectragram of Original Audio</b></Typography>
                                    <Button variant="contained" onClick={() => handlePlayButtonClick(fileList[selectedOption].wavFiles[0])}>Play Audio 1</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <img src={fileList[selectedOption].pngFiles[1]} alt="PNG Image 2" style={{ maxWidth: '100%', height: 'auto' }} />
                                    <Typography variant="body1" gutterBottom><b>Spectragram of Attack Audio</b></Typography>
                                    <Button variant="contained" onClick={() => handlePlayButtonClick(fileList[selectedOption].wavFiles[1])}>Play Audio 2</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Paper>
            <br />
            <Paper sx={{ padding: 2, backgroundColor: '#e0e0e0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Button variant="contained" component={Link} to="/" sx={{ textAlign: 'center', display: 'block', margin: 'auto' }}>Home</Button>
                </Paper>
            </Paper>
        </Box>
    );
}
