import '../App.css'

import {useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

import {fetchRecipes} from "../utils/https.ts";

import Pagination from "../components/Pagination.tsx";
import RecipePlaceholder from "../components/RecipePlaceholder.tsx";
import RecipesItems from "../components/RecipesItems.tsx";

export default function HomePage() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";
    const mode = searchParams.get("mode") || "";
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error} = useQuery({
        queryKey: ['recipes', searchTerm, mode, page],
        queryFn: ({ signal }) => fetchRecipes(
            { searchTerm, page, mode, signal }
        ),
    });

    const hasPagination = data && data.pagination && data.pagination.total_count > 0
    const hasRecipesToShow = !isLoading && (data?.recipes?.length ?? 0) > 0

    // page should reset to first one, when visiting home page from another page
    // like when clicking recipe finder logo
    useEffect(() => {
        const pageParam = parseInt(searchParams.get('page') || '1', 10);
        setPage(isNaN(pageParam) ? 1 : pageParam);
    }, [searchParams]);

    return (
    <>
        <section>
            {isError && <RecipePlaceholder message={error.message} />}
            {isLoading && <RecipePlaceholder message="Loading ..." />}
            {!isLoading && !isError && !hasRecipesToShow && (
                <RecipePlaceholder message="No recipes found ..." />
            )}
            {hasRecipesToShow && <RecipesItems data={data} searchTerm={searchTerm}/>}
        </section>

        {hasPagination && <Pagination
            currentPage={data?.pagination.current_page}
            totalPages={data?.pagination.total_pages}
            totalCount={data?.pagination.total_count}
            nextPage={data?.pagination.next_page}
            prevPage={data?.pagination.prev_page}
            setPage={setPage}
        />}
    </>
    )
}
