import { Box, Typography, Paper } from '@mui/material';

export default function AboutClass() {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" gutterBottom>Class</Typography>
                <Typography variant="body1" paragraph>
                    CS 426 Senior Project in Computer Science, Spring 2023, at UNR, CSE Department
                </Typography>
                <Typography variant="h4" gutterBottom>Professors</Typography>
                <Typography variant="body1" paragraph>
                    David Feil-Seifer, Devrin Lee, Sara Davis
                </Typography>
            </Paper>
        </Box>
    );
}