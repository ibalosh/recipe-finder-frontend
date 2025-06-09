import styles from "./StarRating.module.css";

const StarRating = ({ rating }: { rating: number }) => {
    const totalStars = 5;
    const rounded = Math.round(rating * 2) / 2; // e.g. 3.89 → 4.0, 3.25 → 3.5
    const fullStars = Math.floor(rounded); // number of full stars
    const hasHalfStar = rounded % 1 !== 0;  // true if there's a half star

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
