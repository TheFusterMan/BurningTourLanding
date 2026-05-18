import React from 'react';
import { Box } from '@mui/material';
import ActivitiesSection from '../interactive/ActivitiesSection';
import Gallery from './components/Gallery';
import ReviewsSection from '../reviews/ReviewsSection';

const Main: React.FC = () => {
    return (
        // Добавили paddingTop, равный примерной высоте хедера, чтобы галерея не пряталась под ним
        <Box component="main" sx={{ flexGrow: 1, pt: '70px' }}>

            <Gallery />

            {/* Добавили id="activities" */}
            <div id="activities">
                <ActivitiesSection />
            </div>

            {/* Добавили id="reviews" */}
            <div id="reviews">
                <ReviewsSection />
            </div>

        </Box>
    );
};

export default Main;