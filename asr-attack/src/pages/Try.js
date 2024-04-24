import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function rpiScript(){
    var test = window.open("", "test_window", "width=700,height=350");  
   
    setTimeout(() => {
        test.document.write("<p><b> This is an example window! We will run a python scripts in here and show console outputs when implemented! </b></p>");
    }, 500); // 2000 milliseconds = 2 seconds
    setTimeout(() => {
        test.document.write("<p><i> Program is initializing..... <b><i> (Note: This part is currently for display and is not fully function) </b></i></i></p>");
    }, 2200);
    
    //insert code here to connect python script with js code

    setTimeout(() => {
        test.document.write("<p> Program has now started! </p>");
    }, 5500); 

    setTimeout(() => {
        test.document.write("<p> listening for user input..... <i> (Hint: Say an input such as Hey, Google or Hey, Siri) </i></p>");
    }, 6750);

    setTimeout(() => {
        test.document.write("<p><b> End of Script! </b></p>");
    }, 7750);
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
