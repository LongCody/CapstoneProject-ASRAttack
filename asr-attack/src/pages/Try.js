import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Try() {
    return (
        <Box sx={{ maxWidth: 'auto', margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#e0e0e0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Button variant="contained" id="RPI_Script" onclick="loadRpi();" sx={{ textAlign: 'center', display: 'block', margin: 'auto' }}>Try it here!</Button>
                </Paper>
            </Paper>
        </Box>
    );
}
