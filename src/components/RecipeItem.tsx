import pluralize from 'pluralize';

import "./RecipeItem.css";
import {useState} from "react";
import StarRating from "./StarRating.tsx";
import {useNavigate} from "react-router-dom";
import {Recipe} from "../utils/https.tsx";
import * as React from "react";

type Props = {
    recipe: Recipe,
    searchTerm: string
}

export default function RecipeItem({recipe, searchTerm}: Props){
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


    /**
     * Given a string `text` and a comma-/space-separated `searchTerm`,
     * bolds each whole-word occurrence (singular or plural) of any term.
     */
    function highlightTerms(text: string, searchTerm: string): React.ReactNode[] {
        // 1) split into words, lowercase and dedupe
        const baseWords = Array.from(new Set(searchTerm.toLowerCase().split(/\W+/).filter(Boolean)));
        if (!baseWords.length) return [text];

        // 2) expand each into [singular, plural], dedupe
        const words = Array.from(new Set(
            baseWords.flatMap(w => [ pluralize.singular(w), pluralize.plural(w) ])
        ));

        // 3) build /\b(word1|word2|...)\b/gi
        const re = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');

        // 4) split on that, wrapping matches in <strong>
        return text.split(re).map((chunk, i) =>
            re.test(chunk) ? <strong key={i}>{chunk}</strong> : chunk
        );
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
                            {highlightTerms(
                                limitTextByLength(recipe.ingredients.join(", "),
                                    50
                                ), searchTerm
                            )}
                        </div>
                        <span className="recipe-tag category">🍽 {recipe.category?.name}</span>
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
