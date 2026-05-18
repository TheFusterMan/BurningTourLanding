import React from 'react';

interface Review {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
    tour: string;
}

interface ReviewCardProps {
    review: Review;
}

// Компонент для отображения звёзд рейтинга
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="review-card__rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={star <= rating ? "review-card__star" : "review-card__star review-card__star--empty"}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="review-card">
            <div className="review-card__header">
                <div className="review-card__avatar">
                    {review.name.charAt(0)}
                </div>
                <div className="review-card__info">
                    <h3 className="review-card__name">{review.name}</h3>
                    <p className="review-card__tour">Тур: {review.tour}</p>
                    <StarRating rating={review.rating} />
                </div>
            </div>

            <p className="review-card__text">"{review.text}"</p>

            <span className="review-card__date">{review.date}</span>
        </div>
    );
};

export default ReviewCard;