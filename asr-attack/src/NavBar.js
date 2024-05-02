import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    ASR Attack
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/videos">Videos</Button>
                <Button color="inherit" component={Link} to="/explore">Explore</Button>
                <Button color="inherit" component={Link} to="/about">About</Button>
            </Toolbar>
        </AppBar>
    );
}
