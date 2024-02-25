import { Box, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Try() {

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h2" gutterBottom>Try It</Typography>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel id="audio-select-label">Select Audio Clip</InputLabel>
                    <Select>
                        <MenuItem>Audio Clip 1</MenuItem>
                        <MenuItem>Audio Clip 2</MenuItem>
                        <MenuItem >Audio Clip 3</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" sx={{ marginRight: 2 }}>Play</Button>
            </Paper>
            <br />
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Button variant="contained" component={Link} to="/tutorial" sx={{ textAlign: 'center', display: 'block', margin: 'auto' }}>Tutorial</Button>
            </Paper>
        </Box>
    );
}
