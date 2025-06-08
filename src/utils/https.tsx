import {QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient();

type RecipesSearchProps = {
    searchTerm: string,
    page: number,
    signal: AbortSignal
}

type RecipeSearchProps = {
    id: string
    signal: AbortSignal
}

export interface Recipes {
    recipes: Recipe[]
    pagination: {
        current_page: number
        total_pages: number
        total_count: number
        next_page: number
        prev_page: number
    };
}

export interface Recipe {
    id: number
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
    ingredients: string[],
    short_description: string,
    instructions: string
}

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const authHeaders = { "X-API-Token": import.meta.env.VITE_API_TOKEN }

export async function fetchRecipes({ searchTerm, page, signal }: RecipesSearchProps): Promise<Recipes> {
    let url = `${apiUrl}/recipes`;
    url += '?search=' + searchTerm;

    const response = await fetch(`${url}&page=${page}&per_page=8`,
        { signal: signal , headers: authHeaders });

    if (!response.ok) {
        const error = new Error("Failed to fetch recipes.");
        throw error;
    }

    const { recipes, pagination} = await response.json();
    return { recipes, pagination };
}

export async function fetchRecipe({id, signal }: RecipeSearchProps): Promise<Recipe> {
    const url = `${apiUrl}/recipes/${id}`;

    const response = await fetch(url, { signal: signal, headers: authHeaders});
    if (!response.ok) {
        throw new Error("Failed to fetch recipe.");
    }
    return response.json();
}
