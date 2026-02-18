import styles from "./StarRating.module.css";
import {getStarFillStates, StarFill} from "../utils";

const StarRating = ({ rating }: { rating: number }) => {
    const stars = getStarFillStates(rating, 5);

    return (
        <div>
            {stars.map((item, index) => {
                if (item === StarFill.FULL) {
                    return <span key={index} className={styles.star}>★</span>;
                } else if (item === StarFill.HALF) {
                    return <span key={index} className={`${styles.star} ${styles.half}`}>★</span>;
                } else {
                    return <span key={index}>☆</span>;
                }
            })}
            <span>{rating}</span>
        </div>
    );
};

export default StarRating;
