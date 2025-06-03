type Props = {
    searchTerm: string,
    page: number,
    signal: AbortSignal
}

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export async function fetchRecipes({ searchTerm, page, signal }: Props) {
    let url = `${apiUrl}/recipes`;
    url += '?search=' + searchTerm;

    const response = await fetch(`${url}&page=${page}`, { signal: signal });

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the events");
        throw error;
    }

    const { recipes, pagination} = await response.json();
    return { recipes, pagination };
}
