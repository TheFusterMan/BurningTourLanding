import React from 'react';
import { Container, Typography, Box, Stack, Button } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ReviewCard from './ReviewCard';
import reviewsData from '../../data/reviews.json';
import '../../styles/reviews.css';

interface ReviewsSectionProps {
    onOpenModal: () => void;
}

// 2. Принимаем onOpenModal
const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenModal }) => {
    const reviews = reviewsData.reviews;

    return (
        <Box sx={{ py: 8, bgcolor: '#f8f9fa' }}>
            <Container maxWidth="md">

                <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Отзывы наших путешественников
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Более 500 довольных клиентов за последний год
                </Typography>

                <Stack spacing={2}>
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </Stack>

                {/* 3. Добавляем финальную кнопку призыва к действию (CTA) */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={onOpenModal}
                        endIcon={<LocalFireDepartmentIcon />}
                        sx={{
                            py: 2,
                            px: 6,
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            borderRadius: 8,
                            textTransform: 'none',
                            boxShadow: '0 8px 20px rgba(255, 152, 0, 0.4)' // Красивая оранжевая тень
                        }}
                    >
                        Хочу такие же эмоции! Забронировать
                    </Button>
                </Box>

            </Container>
        </Box>
    );
};

export default ReviewsSection;