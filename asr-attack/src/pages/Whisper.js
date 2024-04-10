import { Box, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import image11 from "./AEs/Whisper/Directions/Original/Directions.png";
import image12 from "./images/Directions_48000_FFT_6682935_BST.png";
import wav11 from "./AEs/Whisper/Directions/Original/Directions.wav";
import wav12 from "./AEs/Whisper/Directions/Attack/Directions_48000_FFT_6682935_BST.wav";

export default function Amazon() {

    const [selectedOption, setSelectedOption] = useState('');
    const [fileList, setFileList] = useState({
        'Directions FFT': {
            pngFiles: [image11, image12],
            wavFiles: [wav11, wav12],
            txtFile: 'Once i fix the txt files, there will be text here'
        },
        'Audio Clip 2': {
            pngFiles: ['../AEs/Whisper/Directions/Original/Directions.png', './AEs/Whisper/Directions/Attack/Directions_48000_FFT_6682935_BST.png'],
            wavFiles: ['./AEs/Whisper/Directions/Original/Directions.wav', './AEs/Whisper/Directions/Attack/Directions_48000_FFT_6682935_BST.wav'],
            txtFile: './AEs/Whisper/Directions/Text/Directions_48000_FFT_6682935_BST.txt'
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
                            <MenuItem value="Directions FFT">Directions FFT</MenuItem>
                            <MenuItem value="Audio Clip 2">Audio Clip 2</MenuItem>
                        </Select>
                    </FormControl>
                    {selectedOption && (
                        <div>
                            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>{selectedOption}</Typography>
                            <br />
                            <Typography variant="body1" gutterBottom>{fileList[selectedOption].txtFile}</Typography>
                            <br />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', padding: 2}}>
                                {fileList[selectedOption].pngFiles.map((pngFile, index) => (
                                    <img key={index} src={pngFile} alt={`PNG ${index + 1}`} />
                                ))}
                            </Box>
                            <br />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', padding: 2}}>
                                <Button variant="contained" onClick={() => handlePlayButtonClick(fileList[selectedOption].wavFiles[0])}>Play Original Audio </Button>
                                <Button variant="contained" onClick={() => handlePlayButtonClick(fileList[selectedOption].wavFiles[1])}>Play Attack Audio</Button>
                            </Box>
                        </div>
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