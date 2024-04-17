import { Box, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import image11 from "./AEs/Wav2Vec2/directions_FFT/Original/directions.png";
import image12 from "./AEs/Wav2Vec2/directions_FFT/Attack/directions.png";
import image21 from "./AEs/Wav2Vec2/audio4_ssa/Original/audio4.png";
import image22 from "./AEs/Wav2Vec2/audio4_ssa/Attack/audio4.png";
import image31 from "./AEs/Wav2Vec2/weathersf_dct/Original/weathersf_dct.png";
import image32 from "./AEs/Wav2Vec2/weathersf_dct/Attack/weathersf_dct.png";
import image41 from "./AEs/Wav2Vec2/sushi_overlay/Original/sushi.png";
import image42 from "./AEs/Wav2Vec2/sushi_overlay/Attack/sushi.png";
import wav11 from "./AEs/Wav2Vec2/directions_FFT/Original/directions.wav";
import wav12 from "./AEs/Wav2Vec2/directions_FFT/Attack/directions.wav";
import wav21 from "./AEs/Wav2Vec2/audio4_ssa/Original/audio4.wav";
import wav22 from "./AEs/Wav2Vec2/audio4_ssa/Attack/audio4.wav";
import wav31 from "./AEs/Wav2Vec2/weathersf_dct/Original/weathersf_dct.wav";
import wav32 from "./AEs/Wav2Vec2/weathersf_dct/Attack/weathersf_dct.wav";
import wav41 from "./AEs/Wav2Vec2/sushi_overlay/Original/sushi.wav";
import wav42 from "./AEs/Wav2Vec2/sushi_overlay/Attack/Asushi.wav";

export default function Amazon() {

    const [selectedOption, setSelectedOption] = useState('');
    const [fileList, setFileList] = useState({
        'Directions FFT': {
            pngFiles: [image11, image12],
            wavFiles: [wav11, wav12],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  I'M HEADING TO THE UNIVERSITY OF NEMATARINO CAN YOU GIVE ME DIRECTIONS AND ESTIMATE HOW LONG THEY'LL TAKE TO GET THERE<br />
            <b>Attack Transcription:</b>  AND HAD INTO THE UNIVERSITY OF VAARENO MEGATLY DIRECTOND AND ASMAE HOM ONG WOLL TE TEGETHER<br />
            <b>MSE:</b> 0.01828808153080579<br />
            </Typography>
        },
        'Audiobook SSA': {
            pngFiles: [image21, image22],
            wavFiles: [wav21, wav22],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  NOW WHAT IS THE SENSE OF IT TWO INNOCENT BABIES LIKE THAT<br />
            <b>Attack Transcription:</b>  NOW WHAT A DEFENCE OF IT SHE GAVE E PAS LIKE TH<br />
            <b>MSE:</b> 0.02097267625090339<br />
            </Typography>
        },
        'Weather DCT': {
            pngFiles: [image31, image32],
            wavFiles: [wav31, wav32],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  WHAT IS THE WEATHER LIKE IN SAN FRANCISCO IAM PLANNING A TRIP<br />
            <b>Attack Transcription:</b>  WHAT IS THE WEATHER WIFE AN SAN FRANCISCO AND PLANTING A TRIP<br />
            <b>MSE:</b> 0.02748742123966161<br />
            </Typography>
        },
        'Sushi Overlay': {
            pngFiles: [image41, image42],
            wavFiles: [wav41, wav42],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  AND CURIOUS ABOUT JAPANESE QUAZINE COULD YOU SUGGEST SOME SOUSHI RECIPES<br />
            <b>Attack Transcription:</b>  I'M CURIOUS O BET RIGHT NEAR WITH GANG TO TURN OUT THE LIVING ROOM LIHLIC SOME SUCHE RECIPES<br />
            <b>MSE:</b> 0.0894576346135537<br />
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
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Wav2Vec2</Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="audio-select-label">Select Transcription</InputLabel>
                        <Select value={selectedOption} onChange={handleSelectChange}>
                            <MenuItem value="Audiobook SSA">Audiobook SSA</MenuItem>
                            <MenuItem value="Directions FFT">Directions FFT</MenuItem>
                            <MenuItem value="Sushi Overlay">Sushi Overlay</MenuItem>
                            <MenuItem value="Weather DCT">Weather DCT</MenuItem>
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
