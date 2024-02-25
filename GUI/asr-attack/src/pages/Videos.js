import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import video1 from "./videos/video1.mp4";
import video2 from "./videos/video2.mp4";
import video3 from "./videos/video3.mp4";
import video4 from "./videos/video4.mp4";

export default function Videos() {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h2" gutterBottom>Videos</Typography>
            </Paper>
            <br />
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" gutterBottom>Video 1</Typography>
                <video src={video1} width="600" height="300" controls />
            </Paper>
            <br />
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" gutterBottom>Video 2</Typography>
                <video src={video2} width="600" height="300" controls />
            </Paper>
            <br />
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" gutterBottom>Video 3</Typography>
                <video src={video3} width="600" height="300" controls />
            </Paper>
            <br />
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" gutterBottom>Video 4</Typography>
                <video src={video4} width="600" height="300" controls />
            </Paper>
            <br />
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Button variant="contained" component={Link} to="/" sx={{ textAlign: 'center', display: 'block', margin: 'auto' }}>Back Home</Button>
            </Paper>
        </Box>
    );
}
