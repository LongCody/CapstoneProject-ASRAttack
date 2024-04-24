import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function rpiScript(){
    var test = window.open("", "test_window", "width=600,height=800");  
    test.document.write("<p> This is an example window! We will run python scripts in here and show console outputs! </p>");

    test.document.write("<p> Program is initializing... </p>");

    test.document.write("<p> Now listening... (Say an input such as Hey, Google or Hey, Alexa) </p>");
}

export default function Try() {
    return (
        <Box sx={{ maxWidth: 'auto', margin: 'auto', padding: 4 }}>
             <Paper sx={{ padding: 2, backgroundColor: '#e0e0e0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>Try It!</Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                        Press the button to test our script that listens for a wake word for your home assistant such as "hey google", then plays an adversarial example.
                    </Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Button variant="contained" onClick={rpiScript} sx={{ textAlign: 'center', display: 'block', margin: 'auto' }}>Try it here!</Button>
                </Paper>
            </Paper>
        </Box>
    );
}
