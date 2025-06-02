import "./RecipeItem.css";
import {useState} from "react";
import StarRating from "./StarRating.tsx";

type Props = {
    recipe: Recipe
}

export interface Recipe {
    title: string
    category: string
    author: string
    image_url: string
    ratings: number
}

export default function RecipeItem({recipe}: Props){
    const [loaded, setLoaded] = useState(false);

    return (
        <li className="recipe-item">
            <article>
                <div className={`image-wrapper ${loaded ? 'loaded' : 'loading'}`}>
                    <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        onLoad={() => setLoaded(true)}
                    />
                </div>
                <div>
                    <div className="recipe-item-details">
                        <h3 className="recipe-item-title">{recipe.title}</h3>
                        <div className="recipe-meta">
                            <span className="recipe-tag category">🍽 {recipe.category}</span>
                            <span className="recipe-tag author">
                                { recipe.author ? `👩‍🍳 ${recipe.author}` : `👤 Deleted user`}
                            </span>
                        </div>
                        <div className="recipe-item-rating"><StarRating rating={recipe.ratings} /></div>
                    </div>
                </div>
            </article>
        </li>
    )
}
