import {Recipe, Recipes} from "../../utils/https.ts";
import RecipesList from "./RecipesList.tsx";
import styles from "./RecipesGrid.module.css";

type Props = {
    data: Recipes | undefined;
    searchTerm: string
}

export default function RecipeCard({data, searchTerm}: Props) {
    return (
        <ul className={styles.recipes}>
            {data!.recipes.map((recipe: Recipe, index: number) => (
                <RecipesList key={index} recipe={recipe} searchTerm={searchTerm}/>
            ))}
        </ul>
    )
}
