
import { Box, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "./AEs/Whisper/Directions_FFT/Original/Directions.png";
import image12 from "./AEs/Whisper/Directions_FFT/Attack/Directions_48000_FFT_6682935_BST.png";
import image22 from "./AEs/Whisper/Directions_Overlay/Attack/Directions_48000_Overlay_50.0_BST.png";
import image31 from "./AEs/Whisper/Baking_DCT/Original/Baking.png";
import image32 from "./AEs/Whisper/Baking_DCT/Attack/Baking_48000_DCT_1000_BST.png";
import image41 from "./AEs/Whisper/Audiobook_SSA/Original/Audiobook.png";
import image42 from "./AEs/Whisper/Audiobook_SSA/Attack/Audiobook_SSA_540_BST.png";
import wav1 from "./AEs/Whisper/Directions_FFT/Original/Directions.wav";
import wav12 from "./AEs/Whisper/Directions_FFT/Attack/Directions_48000_FFT_6682935_BST.wav";
import wav22 from "./AEs/Whisper/Directions_Overlay/Attack/Directions_48000_Overlay_50.0_BST.wav";
import wav31 from "./AEs/Whisper/Baking_DCT/Original/Baking.wav";
import wav32 from "./AEs/Whisper/Baking_DCT/Attack/Baking_48000_DCT_1000_BST.wav";
import wav41 from "./AEs/Whisper/Audiobook_SSA/Original/Audiobook.wav";
import wav42 from "./AEs/Whisper/Audiobook_SSA/Attack/Audiobook_SSA_540_BST.wav";

export default function Whisper() {

    const [selectedOption, setSelectedOption] = useState('');
    const [fileList, setFileList] = useState({
        'Directions FFT': {
            pngFiles: [image1, image12],
            wavFiles: [wav1, wav12],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  I'm heading to the University of Nevada, Reno. Can you give me directions and estimate how long it will take to get there?<br />
            <b>Attack Transcription:</b>  I'm heading to the University of Miami-Dade. Can you give me directions on the estimates for any of the districts you prefer?<br />
            <b>MSE:</b> 0.03541786119546995<br />
            </Typography>
        },
        'Directions Overlay': {
            pngFiles: [image1, image22],
            wavFiles: [wav1, wav22],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  I'm heading to the University of Nevada, Reno. Can you give me directions and estimate how long it will take to get there?<br />
            <b>Attack Transcription:</b>  I'm heading to the University of Utah San Marino. Can you give me directions and estimate how long it will take to get there?<br />
            <b>MSE:</b> 0.02423220412446465<br />
            </Typography>
        },
        'Baking DCT': {
            pngFiles: [image31, image32],
            wavFiles: [wav31, wav32],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  I'm interested in baking could you pull up some recipes for chocolate cake?<br />
            <b>Attack Transcription:</b>  I'm interested in hating this. Could you pull up some rest please for proper tape?<br />
            <b>MSE:</b> 0.03731800146948484<br />
            </Typography>
        },
        'Audiobook SSA': {
            pngFiles: [image41, image42],
            wavFiles: [wav41, wav42],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  They say illumination by candlelight is the prettiest in the world.<br />
            <b>Attack Transcription:</b>  They say a new dimension of the planet has been created in the world.<br />
            <b>MSE:</b> 0.026714972021788085<br />
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
                    <Button variant="contained" component={Link} to="/wav2vec" sx={{ flex: 1, textAlign: 'center' }}>Wav2vec2</Button>
                    <Button variant="contained" component={Link} to="/whisper" sx={{ flex: 1, textAlign: 'center' }}>Whisper</Button>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Whisper</Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="audio-select-label">Select Transcription</InputLabel>
                        <Select value={selectedOption} onChange={handleSelectChange}>
                            <MenuItem value="Audiobook SSA">Audiobook SSA</MenuItem>
                            <MenuItem value="Baking DCT">Baking DCT</MenuItem>
                            <MenuItem value="Directions FFT">Directions FFT</MenuItem>
                            <MenuItem value="Directions Overlay">Directions Overlay</MenuItem>
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
