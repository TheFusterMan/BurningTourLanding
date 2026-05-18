// src/components/Footer.tsx
import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#333', color: 'white', py: 6, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Stack spacing={2} sx={{ alignItems: 'center' }}>
                    <Typography variant="h5">Готовы к приключениям?</Typography>
                    <Typography variant="body1">Свяжитесь с нами: +7 (999) 000-00-00</Typography>
                    <Typography variant="body2" color="gray">
                        © {new Date().getFullYear()} WildTours. Все права защищены.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;