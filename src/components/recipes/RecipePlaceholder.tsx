import styles from "./RecipePlaceholder.module.css";
import gridStyles from "./RecipesGrid.module.css";

export default function RecipePlaceholder({ message }: { message: string }) {
    return (
        <div className={styles.container}>
            {message && <p className={styles.message}>{message}</p>}
            <ul className={gridStyles.recipes}>
                {[...Array(16)].map((_, i) => (
                    <li key={i} className={styles.item}>
                        <div className={styles.imageSkeleton} />
                        <div className={styles.textSkeleton}>
                            <div className={`${styles.line} ${styles.short}`} />
                            <div className={`${styles.line} ${styles.long}`} />
                            <div className={`${styles.line} ${styles.medium}`} />
                        </div>
                    </li>)
                )}
            </ul>
        </div>
    );
}
