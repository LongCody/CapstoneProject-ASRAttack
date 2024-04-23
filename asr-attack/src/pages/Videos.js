import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import video2 from "./videos/video2.mp4";
import video3 from "./videos/video3.mp4";
import video4 from "./videos/video4.mp4";

export default function Videos() {
    return (
        <Box sx={{ maxWidth: 'auto', margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#e0e0e0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>Videos</Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Project Video</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ReactPlayer url="https://www.youtube.com/watch?v=nmwzV6JjPe4" width="600px" height="300px" controls />
                    </Box>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Raspberry Pi Set Up</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <video src={video2} width="600" height="300" controls />
                    </Box>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Google Transcriptions</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <video src={video3} width="600" height="300" controls />
                    </Box>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Amazon Transcriptions</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <video src={video4} width="600" height="300" controls />
                    </Box>
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
