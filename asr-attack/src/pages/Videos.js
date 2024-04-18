import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import video1 from "./videos/video1.mp4";
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
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Video 1</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <video src={video1} width="600" height="300" controls />
                    </Box>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Video 2</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <video src={video2} width="600" height="300" controls />
                    </Box>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Video 3</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <video src={video3} width="600" height="300" controls />
                    </Box>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Video 4</Typography>
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
