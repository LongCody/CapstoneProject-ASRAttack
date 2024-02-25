import { Box, Typography, Paper } from '@mui/material';

export default function AboutAssignments() {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" gutterBottom>Project Assignments</Typography>
                <Typography variant="body1" paragraph>
                    <a href="https://docs.google.com/document/d/1W6CCi4A_agyxoqVzdUJNncBaryD-oAeowiCVHtbwH9g/edit?usp=sharing">Project Proposal Cs 425</a>                    
                    <br />
                    <a href="https://docs.google.com/document/d/1ZcyU_OnE4O3uGQ_w1bZLcNY6LYg9MAKM5D_hJo_TdPo/edit?usp=sharing">Part 2 Specification Cs 425</a>
                    <br />
                    <a href="https://docs.google.com/document/d/1TF67I76xl00qo2x3vptkTtozCFejuSVaib4sFk2UWgE/edit?usp=sharing">Part 3 Design Cs 425</a>
                    <br />
                    <a href="https://docs.google.com/document/d/11VJXepqo2p-x-trvIDyBMwu5-e-OyQBp9cB_MtJDbRE/edit?usp=sharing">Part 4 Prototype Cs 425</a>
                    <br />
                    <a href="https://docs.google.com/document/d/1K4gMTEk_Eo6HGyp4cBo4v1dEyxKpGkn65LhU0cxB_BI/edit?usp=sharing">Part 1 Revised Project Proposal Cs 426</a>
                    <br />
                </Typography>
            </Paper>
        </Box>
    );
}