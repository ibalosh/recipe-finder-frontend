import '../App.css'

import Footer from "../components/Footer.tsx";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import RecipePlaceholder from "../components/RecipePlaceholder.tsx";
import {fetchRecipe} from "../utils/https.tsx";

export interface RecipeDetails {
    title: string
    category: {
        id: number,
        name: string
    }
    author: {
        id: number
        name: string
    },
    cuisine: {
        id: number,
        name: string
    }
    image_url: string
    ratings: number,
    cook_time: number,
    prep_time: number,
    ingredients: string[]
}

export default function RecipeDetail() {
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
        <>
            <section>
                <h2>{recipe.title}</h2>
                {recipe.image_url && (
                    <img src={recipe.image_url} alt={recipe.title} style={{ maxWidth: "400px", borderRadius: "8px" }} />
                )}

                <p><strong>Author:</strong> {recipe.author?.name || "Unknown"}</p>
                <p><strong>Category:</strong> {recipe.category?.name || "Uncategorized"}</p>
                <p><strong>Cuisine:</strong> {recipe.cuisine?.name || "N/A"}</p>
                <p><strong>Rating:</strong> {recipe.ratings}</p>
                <p><strong>Prep Time:</strong> {recipe.prep_time} min</p>
                <p><strong>Cook Time:</strong> {recipe.cook_time} min</p>

                <h4>Ingredients</h4>
                <ul>
                    {recipe.ingredients.map((ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </section>
            <Footer />
        </>
    );
}
