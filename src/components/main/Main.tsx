import React from 'react';
import { Box } from '@mui/material';
import ActivitiesSection from '../interactive/ActivitiesSection';

const Gallery: React.FC = () => <Box sx={{ height: 400, bgcolor: '#cfd8dc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Галерея (Слайдер)</h2></Box>;
const Reviews: React.FC = () => <Box sx={{ height: 300, bgcolor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Отзывы</h2></Box>;

const Main: React.FC = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1 }}>
            <Gallery />
            <ActivitiesSection />
            <Reviews />
        </Box>
    );
};

export default Main;