import {Recipe, Recipes} from "../utils/https.tsx";
import RecipeItem from "./RecipeItem.tsx";
import "./RecipeItem.css"

type Props = {
    data: Recipes | undefined;
    searchTerm: string
}

export default function RecipesItems({data, searchTerm}: Props) {
    return (
        <ul id="recipes">
            {data!.recipes.map((recipe: Recipe, index: number) => (
                <RecipeItem key={index} recipe={recipe} searchTerm={searchTerm}/>
            ))}
        </ul>
    )
}
