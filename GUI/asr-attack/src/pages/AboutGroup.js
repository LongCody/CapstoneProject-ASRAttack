import { Box, Typography, Paper } from '@mui/material';

export default function AboutGroup() {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" gutterBottom>Advisor</Typography>
                <Typography variant="body1" paragraph>
                    Dr. Rui Hu - Assistant Professor in the Department of Computer Science & Engineering at the University of Nevada, Reno
                    Chase Carthen - Research Data Architect
                </Typography>
                <Typography variant="h4" gutterBottom>Group Members</Typography>
                <Typography variant="body1" paragraph>
                    Kristian Konstantinov, Zachary Strazi, Cody Long, Jacob Ayers
                </Typography>
            </Paper>
        </Box>
    );
}