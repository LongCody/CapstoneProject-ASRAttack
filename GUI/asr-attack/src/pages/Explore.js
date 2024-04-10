import { Box, Typography, Button, Paper} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Try() {

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
                    <Button variant="contained" component={Link} to="/amazon" sx={{ flex: 1, textAlign: 'center' }}>Google</Button>
                    <Button variant="contained" component={Link} to="/amazon" sx={{ flex: 1, textAlign: 'center' }}>Wav2vec2</Button>
                    <Button variant="contained" component={Link} to="/amazon" sx={{ flex: 1, textAlign: 'center' }}>Whisper</Button>
                </Paper>
                <br />
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