import React from 'react';
import { Box } from '@mui/material';
import ActivitiesSection from '../interactive/ActivitiesSection';
import ReviewsSection from '../reviews/ReviewsSection';

const Gallery: React.FC = () => <Box sx={{ height: 400, bgcolor: '#cfd8dc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Галерея (Слайдер)</h2></Box>;

const Main: React.FC = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1 }}>
            <Gallery />
            <ActivitiesSection />
            <ReviewsSection />
        </Box>
    );
};

export default Main;