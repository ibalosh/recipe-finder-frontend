type Props = {
    searchTerm: string,
    page: number,
    signal: AbortSignal
}

export async function fetchRecipes({ searchTerm, page, signal }: Props) {
    let url = 'http://localhost:3000/recipes';
    url += '?q=' + searchTerm;

    const response = await fetch(`${url}&page=${page}`, { signal: signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        throw error;
    }

    const { recipes, pagination} = await response.json();
    return { recipes, pagination };
}
