import '../App.css'

import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

import {fetchRecipe} from "../utils/https.tsx";

import RecipePlaceholder from "../components/RecipePlaceholder.tsx";
import RecipeDetails from "../components/RecipeDetails.tsx";

export default function RecipePage() {
    const params = useParams();

    const {
        data: recipe,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["recipe", { id: params.id}],
        queryFn: ({ signal }) => fetchRecipe({ id: params.id!, signal}),
        enabled: !!params.id,
    });

    if (isLoading) return <RecipePlaceholder message="Loading recipe..." />;
    if (isError || !recipe) return <RecipePlaceholder message={error?.message || "Recipe not found."} />;

    return (
        <section>
            <RecipeDetails recipe={recipe} />
        </section>
    );
}
