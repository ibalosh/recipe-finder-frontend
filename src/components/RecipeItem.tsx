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

    function hey() {
        navigate(`/recipes/${recipe.id}`)
    }


    return (
        <li className="recipe-item" onClick={hey}>
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
                            <span className="recipe-tag category">🍽 {recipe.category.name}</span>
                            <span className="recipe-tag author">
                                { recipe.author ? `👩‍🍳 ${recipe.author.name}` : `👤 Deleted user`}
                            </span>
                        </div>
                        <div className="recipe-item-rating"><StarRating rating={recipe.ratings} /></div>
                    </div>
                </div>
            </article>
        </li>
    )
}
