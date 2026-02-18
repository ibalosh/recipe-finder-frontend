import {Recipe, Recipes} from "../utils/https.ts";
import RecipesItem from "./RecipesItem.tsx";
import "./Recipes.css"

type Props = {
    data: Recipes | undefined;
    searchTerm: string
}

export default function RecipesItems({data, searchTerm}: Props) {
    return (
        <ul id="recipes">
            {data!.recipes.map((recipe: Recipe, index: number) => (
                <RecipesItem key={index} recipe={recipe} searchTerm={searchTerm}/>
            ))}
        </ul>
    )
}
