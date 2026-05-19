import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/main/Main';
import BookingModal from './components/modal/BookingModal';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2e7d32',
        },
        secondary: {
            main: '#ff9800',
        },
        background: {
            default: '#f5f5f5',
        }
    },
});

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header onOpenModal={() => setIsModalOpen(true)} />
                <Main onOpenModal={() => setIsModalOpen(true)} />
                <Footer />
            </Box>

            <BookingModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </ThemeProvider>
    );
};

export default App;