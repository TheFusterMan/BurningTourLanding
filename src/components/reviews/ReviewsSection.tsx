import React from 'react';
import { Container, Typography } from '@mui/material';
import ReviewCard from './ReviewCard';
import reviewsData from '../../data/reviews.json';

const ReviewsSection: React.FC = () => {
    const reviews = reviewsData.reviews;

    return (
        <section className="reviews-section">
            <Container maxWidth="lg">
                <Typography variant="h3" className="reviews-section__title">
                    Отзывы наших путешественников
                </Typography>
                <Typography variant="subtitle1" className="reviews-section__subtitle">
                    Более 500 довольных клиентов за последний год
                </Typography>

                <div className="reviews-list">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ReviewsSection;