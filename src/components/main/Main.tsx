import React from 'react';
import { Box } from '@mui/material';
import ActivitiesSection from '../interactive/ActivitiesSection';
import Gallery from './components/Gallery'; // Импортируем наш новый компонент
import ReviewsSection from '../reviews/ReviewsSection';

const Main: React.FC = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1 }}>
            {/* Теперь здесь настоящая галерея */}
            <Gallery />
            <ActivitiesSection />
            <ReviewsSection />
        </Box>
    );
};

export default Main;