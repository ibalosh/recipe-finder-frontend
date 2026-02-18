import StarRating from "../ui/StarRating.tsx";
import {Recipe} from "../../utils/https.ts";
import styles from "./RecipeDetails.module.css";

export default function RecipeDetails({recipe}: {recipe: Recipe}) {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>{recipe.title}</h1>

            {recipe.short_description && (
                <p className={styles.description}>{recipe.short_description}</p>
            )}

            <div className={styles.meta}>
                <div className={styles.metaItem}>👩‍🍳 {recipe.author?.name || 'Anonymous'}</div>
                <div className={styles.metaItem}>🍽 {recipe.category?.name || 'Uncategorized'}</div>
                <div className={styles.metaItem}>🌍 {recipe.cuisine?.name || 'Various'}</div>
            </div>

            {recipe.image_url && (
                <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className={styles.image}
                />
            )}

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>📝 Ingredients</h2>
                <ul className={styles.ingredients}>
                    {recipe.ingredients.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>

            {recipe.instructions && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>👨‍🍳 Instructions</h2>
                    <p className={styles.instructions}>{recipe.instructions}</p>
                </div>
            )}

            <div className={styles.footer}>
                <span>⏱ Preparation time: {recipe.prep_time} min | Cook time: {recipe.cook_time} min</span>
                <StarRating rating={recipe.ratings} />
            </div>
        </div>
    )
}
