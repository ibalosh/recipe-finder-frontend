import pluralize from 'pluralize';

import {useState} from "react";
import StarRating from "@/components/ui/StarRating.tsx";
import {useNavigate} from "react-router-dom";
import {Recipe} from "@/utils/https.ts";
import * as React from "react";
import styles from "./RecipesList.module.css";

type Props = {
    recipe: Recipe,
    searchTerm: string
}

export default function RecipesList({recipe, searchTerm}: Props){
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
        <li className={styles.item} onClick={visitRecipePage}>
            <article>
                <div className={`${styles.imageWrapper} ${loaded ? styles.loaded : ""}`}>
                    <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        onLoad={() => setLoaded(true)}
                    />
                </div>

                <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>{limitTextByLength(recipe.title,30) }</h3>
                    <div className={styles.meta}>
                        <div className={styles.ingredientsText}>
                            {highlightTerms(
                                limitTextByLength(recipe.ingredients.join(", "),
                                    50
                                ), searchTerm
                            )}
                        </div>
                        <span className={`${styles.tag} ${styles.tagCategory}`}>🍽 {recipe.category?.name}</span>
                        <span className={`${styles.tag} ${styles.tagAuthor}`}>
                        { recipe.author ? `👩‍🍳 ${recipe.author.name}` : `👤 Deleted user`}
                    </span>
                    </div>

                    <div className={styles.itemRating}><StarRating rating={recipe.ratings} /></div>
                </div>
            </article>
        </li>
    )
}
