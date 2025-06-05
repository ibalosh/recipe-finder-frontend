import {Recipe, Recipes} from "../utils/https.tsx";
import RecipeItem from "./RecipeItem.tsx";
import "./RecipeItem.css"

type Props = {
    data: Recipes | undefined;
}

export default function RecipesItems({data}: Props) {
    return (
        <ul id="recipes">
            {data!.recipes.map((recipe: Recipe, index: number) => (
                <RecipeItem key={index} recipe={recipe} />
            ))}
        </ul>
    )
}
