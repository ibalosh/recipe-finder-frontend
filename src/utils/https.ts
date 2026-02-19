import {QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient();
export const API_ENDPOINTS = {
    recipes: "/recipes",
    recipeById: (id: string) => `/recipes/${id}`,
} as const;

type RecipesSearchProps = {
    searchTerm: string,
    page: number,
    mode: string,
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
        next_page: number | null
        prev_page: number | null
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

export async function fetchRecipes({ searchTerm, page, mode, signal }: RecipesSearchProps): Promise<Recipes> {
    let url = `${apiUrl}${API_ENDPOINTS.recipes}`;
    url += '?search=' + searchTerm;
    url += '&mode=' + mode

    const response = await fetch(`${url}&page=${page}&per_page=8`,
        { signal: signal , headers: authHeaders });

    if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
    }

    const { recipes, pagination} = await response.json();
    return { recipes, pagination };
}

export async function fetchRecipe({id, signal }: RecipeSearchProps): Promise<Recipe> {
    const url = `${apiUrl}${API_ENDPOINTS.recipeById(id)}`;

    const response = await fetch(url, { signal: signal, headers: authHeaders});
    if (!response.ok) {
        throw new Error("Failed to fetch recipe.");
    }
    return response.json();
}
