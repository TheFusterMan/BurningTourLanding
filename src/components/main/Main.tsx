import React from 'react';
import { Box } from '@mui/material';
import ActivitiesSection from '../interactive/ActivitiesSection';
import Gallery from './components/Gallery';
import ReviewsSection from '../reviews/ReviewsSection';
interface MainProps {
    onOpenModal: () => void;
}

const Main: React.FC<MainProps> = ({ onOpenModal }) => {
    return (
        // Добавили paddingTop, равный примерной высоте хедера, чтобы галерея не пряталась под ним
        <Box component="main" sx={{flexGrow: 1, pt: '70px'}}>

            <Gallery onOpenModal={onOpenModal}/>

            {/* Добавили id="activities" */}
            <div id="activities">
                <ActivitiesSection onOpenModal={onOpenModal}/>
            </div>

            {/* Добавили id="reviews" */}
            <div id="reviews">
                <ReviewsSection onOpenModal={onOpenModal} />
            </div>

        </Box>
    );
};

export default Main;