import "./StarRating.css";

const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const totalStars = 5;

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, i) => {
                if (i < fullStars) {
                    return <span key={i} className="star full">★</span>;
                } else if (i === fullStars && hasHalfStar) {
                    return <span key={i} className="star half">★</span>;
                } else {
                    return <span key={i} className="star empty">☆</span>;
                }
            })}
            <span className="rating">{rating}</span>
        </div>
    );
};

export default StarRating;
