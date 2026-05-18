import React from 'react';
import { Box } from '@mui/material';
import ActivitiesSection from '../interactive/ActivitiesSection';
import Gallery from './components/Gallery'; // Импортируем наш новый компонент

const Reviews: React.FC = () => <Box sx={{ height: 300, bgcolor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Отзывы</h2></Box>;

const Main: React.FC = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1 }}>
            {/* Теперь здесь настоящая галерея */}
            <Gallery />
            <ActivitiesSection />
            <Reviews />
        </Box>
    );
};

export default Main;