import { Box, Typography, Paper } from '@mui/material';

export default function AboutResources() {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" gutterBottom>Problem Domain Book</Typography>
                <Typography variant="body1" paragraph>
                    LI, J., Deng, L., Haeb-Umbach, R., & Gong, Y. (2015). Robust Automatic Speech Recognition: A Bridge to Practical Applications (1st ed.). Academic Press.
                </Typography>
                <Typography variant="h4" gutterBottom>Related Resources</Typography>
                <Typography variant="body1" paragraph>
                    Abdullah, H., Rahman, M. S., Garcia, W., Warren, K., Yadav, A. S., Shrimpton, T., & Traynor, P. (2021). Hear “no evil”, see “kenansville”:<br /> Efficient and transferable black-box attacks on speech recognition and Voice Identification Systems. 2021 IEEE Symposium on Security and Privacy (SP). <a href="https://doi.org/10.1109/sp40001.2021.00009">IEEE</a>
                    <br />
                    <br />
                    Carlini N, Wagner D. Audio Adversarial Examples:<br /> Targeted Attacks on Speech-to-Text. IEEE Xplore. <a href="doi:https://doi.org/10.1109/SPW.2018.00009">IEEE</a>
                    <br />
                    <br />
                    Y. Chen, X. Yuan, J. Zhang, Y. Zhao, S. Zhang, K. Chen, and X. Wang, “Devil’s whisper:<br /> A general approach for physical adversarial attacks against commercial black-box speech recognition devices,” in 29th USENIX Security Symposium (USENIX Security 20), 2020.
                </Typography>
                <Typography variant="h4" gutterBottom>Related Links</Typography>
                <Typography variant="body1" paragraph>
                    <a href="https://github.com/kwarren9413/kenansville_attack/blob/master/README.md">KenansVille Attack</a>
                    <br />
                    <a href="https://github.com/RiskySignal/Devil-Whisper-Attack">Devils Whisper</a>
                    <br />
                    <a href="https://nicholas.carlini.com/">Nicholas Carlini</a>
                    <br />
                </Typography>
            </Paper>
        </Box>
    );
}