import { Box, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import image11 from "./AEs/Google/food_fft/Original/food_fft.png";
import image12 from "./AEs/Google/food_fft/Attack/food_fft.png";
import image21 from "./AEs/Google/alarm_overlay/Original/alarm_overlay.png";
import image22 from "./AEs/Google/alarm_overlay/Attack/alarm_overlay.png";
import image31 from "./AEs/Google/weathersf_dct/Original/weathersf_dct.png";
import image32 from "./AEs/Google/weathersf_dct/Attack/weathersf_dct.png";
import image41 from "./AEs/Google/audiobook_ssa/Original/audiobook_ssa.png";
import image42 from "./AEs/Google/audiobook_ssa/Attack/audiobook_ssa.png";
import wav11 from "./AEs/Google/food_fft/Original/food_fft.wav";
import wav12 from "./AEs/Google/food_fft/Attack/food_fft.wav";
import wav21 from "./AEs/Google/alarm_overlay/Original/alarm_overlay.wav";
import wav22 from "./AEs/Google/alarm_overlay/Attack/alarm_overlay.wav";
import wav31 from "./AEs/Google/weathersf_dct/Original/weathersf_dct.wav";
import wav32 from "./AEs/Google/weathersf_dct/Attack/weathersf_dct.wav";
import wav41 from "./AEs/Google/audiobook_ssa/Original/audiobook_ssa.wav";
import wav42 from "./AEs/Google/audiobook_ssa/Attack/audiobook_ssa.wav";

export default function Google() {

    const [selectedOption, setSelectedOption] = useState('');
    const [fileList, setFileList] = useState({
        'Food FFT': {
            pngFiles: [image11, image12],
            wavFiles: [wav11, wav12],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  the stale smell of old beer lingers it takes heat to bring out the odor a cold dip restores health and zest a salt pickle taste fine with ham tacos al pastor are my favorite a zestful food is the hot cross bun<br />
            <b>Attack Transcription:</b>  the song smell of old beer lingers it takes heat to bring out the odor I called it before his house and that's a salt pickle is find the fan tacos al pastor on my Facebook is vegetable food is she hot cross buns<br />
            <b>MSE:</b> 0.008231535796985287<br />
            </Typography>
        },
        'Alarm Overlay': {
            pngFiles: [image21, image22],
            wavFiles: [wav21, wav22],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  can you set an alarm tomorrow for 6:00 in the morning<br />
            <b>Attack Transcription:</b>  I'm interested in baking could you pull up for 6:00 in the morning<br />
            <b>MSE:</b> 0.012514234303109006<br />
            </Typography>
        },
        'Weather DCT': {
            pngFiles: [image31, image32],
            wavFiles: [wav31, wav32],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  what is the weather like in San Francisco I'm planning a trip<br />
            <b>Attack Transcription:</b>  what is the weather like in San Francisco in Chinese Express<br />
            <b>MSE:</b> 0.04696514946641766<br />
            </Typography>
        },
        'Audiobook SSA': {
            pngFiles: [image41, image42],
            wavFiles: [wav41, wav42],
            txtFile: <Typography variant="body1" gutterBottom>                
            <b>Original Transcription:</b>  can you imagine why Buckingham has been so violent I suspect<br />
            <b>Attack Transcription:</b>  can you imagine my Buckingham has been so violent I suspect<br />
            <b>MSE:</b> 0.016094765852237472<br />
            </Typography>
        }
    });

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [isPlaying1, setIsPlaying1] = useState(false);
    const [isPlaying2, setIsPlaying2] = useState(false);
    const [audio1, setAudio1] = useState(null);
    const [audio2, setAudio2] = useState(null);
    const handlePlayButtonClick = (wavFile, isPlaying, setIsPlaying, audioState, setAudioState) => {
        if (isPlaying) {
            audioState.pause();
            setIsPlaying(false);
        } else {
            const audio = new Audio(wavFile);
            audio.play();
            audio.onended = () => setIsPlaying(false);
            setIsPlaying(true);
            setAudioState(audio);
        }
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
                            <MenuItem value="Alarm Overlay">Alarm Overlay</MenuItem>
                            <MenuItem value="Audiobook SSA">Audiobook SSA</MenuItem>
                            <MenuItem value="Food FFT">Food FFT</MenuItem>
                            <MenuItem value="Weather DCT">Weather DCT</MenuItem>
                        </Select>
                    </FormControl>
                    {selectedOption && (
                        <Grid><Typography variant="body1" gutterBottom>{fileList[selectedOption].txtFile}</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <img src={fileList[selectedOption].pngFiles[0]} alt="PNG Image 1" style={{ maxWidth: '100%', height: 'auto' }} />
                                    <Typography variant="body1" gutterBottom><b>Spectragram of Original Audio</b></Typography>
                                    <Button variant="contained" onClick={() => handlePlayButtonClick(fileList[selectedOption].wavFiles[0], isPlaying1, setIsPlaying1, audio1, setAudio1)} sx={{ boxShadow: isPlaying1 ? 'inset 0px 4px 10px rgba(0, 0, 0, 0.3)' : '0px 4px 10px rgba(0, 0, 0, 0.3)' }}>{isPlaying1 ? 'Stop Audio 1' : 'Play Audio 1'}</Button>                                
                                </Grid>
                                <Grid item xs={6}>
                                    <img src={fileList[selectedOption].pngFiles[1]} alt="PNG Image 2" style={{ maxWidth: '100%', height: 'auto' }} />
                                    <Typography variant="body1" gutterBottom><b>Spectragram of Attack Audio</b></Typography>
                                    <Button variant="contained" onClick={() => handlePlayButtonClick(fileList[selectedOption].wavFiles[1], isPlaying2, setIsPlaying2, audio2, setAudio2)} sx={{ boxShadow: isPlaying2 ? 'inset 0px 4px 10px rgba(0, 0, 0, 0.3)' : '0px 4px 10px rgba(0, 0, 0, 0.3)' }}>{isPlaying2 ? 'Stop Audio 2' : 'Play Audio 2'}</Button>                                
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
