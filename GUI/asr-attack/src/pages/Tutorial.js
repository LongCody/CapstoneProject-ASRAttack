import { Box, Typography, Paper } from '@mui/material';
import tutorialVideo from "./videos/video1.mp4";

export default function Tutorial() {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h2" gutterBottom>Tutorial</Typography>
                <Typography variant="body1" paragraph>
                    Watch the video below to learn how to use the application.
                </Typography>
                <video src={tutorialVideo} width="800" height="400" controls />
            </Paper>
        </Box>
    );
}