import styles from "./StarRating.module.css";

const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const totalStars = 5;

    return (
        <div className={styles.starRating}>
            {[...Array(totalStars)].map((_, i) => {
                if (i < fullStars) {
                    return <span key={i} className={styles.star}>★</span>;
                } else if (i === fullStars && hasHalfStar) {
                    return <span key={i} className={`${styles.star} ${styles.half}`}>★</span>;
                } else {
                    return <span key={i} className={`${styles.empty} ${styles.empty}`}>☆</span>;
                }
            })}
            <span className={styles.starRating}>{rating}</span>
        </div>
    );
};

export default StarRating;
