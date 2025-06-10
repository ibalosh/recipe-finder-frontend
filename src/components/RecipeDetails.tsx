import StarRating from "./StarRating.tsx";
import {Recipe} from "../utils/https.tsx";
import "../components/RecipeDetails.css"

export default function RecipeDetails({recipe}: {recipe: Recipe}) {
    return (
        <div className="recipe-container">
            <h1 className="recipe-heading">{recipe.title}</h1>

            {recipe.short_description && (
                <p className="recipe-description">{recipe.short_description}</p>
            )}

            <div className="recipe-meta">
                <div className="recipe-meta-item">👩‍🍳 {recipe.author?.name || 'Anonymous'}</div>
                <div className="recipe-meta-item">🍽 {recipe.category?.name || 'Uncategorized'}</div>
                <div className="recipe-meta-item">🌍 {recipe.cuisine?.name || 'Various'}</div>
            </div>

            {recipe.image_url && (
                <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="recipe-image"
                />
            )}

            <div className="recipe-section">
                <h2 className="recipe-section-title">📝 Ingredients</h2>
                <ul className="recipe-ingredients">
                    {recipe.ingredients.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>

            {recipe.instructions && (
                <div className="recipe-section">
                    <h2 className="recipe-section-title">👨‍🍳 Instructions</h2>
                    <p className="recipe-instructions">{recipe.instructions}</p>
                </div>
            )}

            <div className="recipe-footer">
                <span>⏱ Preparation time: {recipe.prep_time} min | Cook time: {recipe.cook_time} min</span>
                <StarRating rating={recipe.ratings} />
            </div>
        </div>
    )
}
