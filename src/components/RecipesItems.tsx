import RecipeItem, {Recipe} from "./RecipeItem.tsx";

interface Recipes {
    recipes: Recipe[];
    pagination: object;
}

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
