// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Header: React.FC = () => {
    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        WildTours 🏕️
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;