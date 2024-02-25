import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    ASR Attack
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/videos">Videos</Button>
                <Button color="inherit" component={Link} to="/try-it">Try It</Button>
                <Button
                    color="inherit"
                    onClick={handleMenuClick}
                    aria-controls="about-menu"
                    aria-haspopup="true"
                >
                    About
                </Button>
                <Menu
                    id="about-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} component={Link} to="/about-class">
                        Class
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/about-group">
                        Group
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/about-project">
                        Project
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/about-assignments">
                        Assignments
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/about-resources">
                        Resources
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}