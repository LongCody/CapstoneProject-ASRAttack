import { Box, Typography, Paper } from '@mui/material';

export default function AboutProject() {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" gutterBottom>The Project</Typography>
                <Typography variant="body1" paragraph>
                    The ASR-Attack project has many impacts and could be very significant when it comes to the safety of ASR’s and the creation of their programming. ASR devices have recently been integrated into a multitude of devices and has worked its way into people's homes and become a normal part of their lives. WIth this the interest in their safety and defense has become of interest. Our project looks to abuse these systems using perturbed audio files which become our adversarial examples. The use of these adversarial examples can help determine specific flaws within these devices, which leads the the significance of the project, which is to determine what causes an adversarial example to cause an ASR device to misinterpret the audio and how the audio manipulates the device. The impact is that this research can allow the makers of these devices to realize the given manipulation of the system and fix any flaws.
                </Typography>
            </Paper>
        </Box>
    );
}