import {QueryClient} from "@tanstack/react-query";
import {RecipePage} from "../pages/RecipePage.tsx";

export const queryClient = new QueryClient();

type RecipesProps = {
    searchTerm: string,
    page: number,
    signal: AbortSignal
}

type RecipeProps = {
    id: string
    signal: AbortSignal
}

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const authHeaders = { "X-API-Token": import.meta.env.VITE_API_TOKEN }

export async function fetchRecipes({ searchTerm, page, signal }: RecipesProps) {
    let url = `${apiUrl}/recipes`;
    url += '?search=' + searchTerm;

    const response = await fetch(`${url}&page=${page}`,
        { signal: signal , headers: authHeaders });

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the events");
        throw error;
    }

    const { recipes, pagination} = await response.json();
    return { recipes, pagination };
}

export async function fetchRecipe({id, signal }: RecipeProps): Promise<RecipePage> {
    const url = `${apiUrl}/recipes/${id}`;
    console.log(url)

    const response = await fetch(url, { signal: signal, headers: authHeaders});
    if (!response.ok) {
        throw new Error("Failed to fetch recipe");
    }
    return response.json();
}
