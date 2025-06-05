import "./RecipeItem.css";
import {useState} from "react";
import StarRating from "./StarRating.tsx";
import {useNavigate} from "react-router-dom";
import {Recipe} from "../utils/https.tsx";

type Props = {
    recipe: Recipe
}

export default function RecipeItem({recipe}: Props){
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    function visitRecipePage() {
        navigate(`/recipes/${recipe.id}`)
    }

    function limitTextByLength(textToLimit: string, limit: number) {
        let result = textToLimit;

        if (textToLimit.length > limit) {
            result = textToLimit.slice(0,limit) + "..."
        }

        return result;
    }

    return (
        <li className="recipe-item" onClick={visitRecipePage}>
            <article>
                <div className={`image-wrapper ${loaded ? 'loaded' : 'loading'}`}>
                    <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        onLoad={() => setLoaded(true)}
                    />
                </div>

                <div className="recipe-item-details">
                    <h3 className="recipe-item-title">{limitTextByLength(recipe.title,30) }</h3>
                    <div className="recipe-meta">
                        <div className="recipe-ingredients-text">
                            {limitTextByLength(recipe.ingredients.join(", "), 50)}
                        </div>
                        <span className="recipe-tag category">🍽 {recipe.category.name}</span>
                        <span className="recipe-tag author">
                        { recipe.author ? `👩‍🍳 ${recipe.author.name}` : `👤 Deleted user`}
                    </span>
                    </div>

                    <div className="recipe-item-rating"><StarRating rating={recipe.ratings} /></div>
                </div>
            </article>
        </li>
    )
}
