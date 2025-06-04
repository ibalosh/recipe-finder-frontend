import '../App.css'

import {useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

import {fetchRecipes} from "../utils/https.tsx";

import Footer from "../components/Footer.tsx";
import Pagination from "../components/Pagination.tsx";
import RecipePlaceholder from "../components/RecipePlaceholder.tsx";
import RecipesItems from "../components/RecipesItems.tsx";

export default function HomePage() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error} = useQuery({
        queryKey: ['recipes', searchTerm, page],
        queryFn: ({ signal }) => fetchRecipes({ searchTerm, page, signal }),
    });

    const hasPagination = data && data.pagination && data.pagination.total_count > 0
    const noDataToShow = !isLoading && data?.recipes?.length === 0
    const hasDataToShow = !isLoading && data?.recipes?.length > 0

    return (
    <main>
        <section>
            {isError && <RecipePlaceholder message={error.message} />}
            {isLoading && <RecipePlaceholder message="Loading ..." />}
            {noDataToShow && <RecipePlaceholder message="No recipes found ..." />}
            {hasDataToShow && <RecipesItems data={data}/>}
        </section>

        {hasPagination && <Pagination
            currentPage={data?.pagination.current_page}
            totalPages={data?.pagination.total_pages}
            totalCount={data?.pagination.total_count}
            nextPage={data?.pagination.next_page}
            prevPage={data?.pagination.prev_page}
            setPage={setPage}
        />}
        <Footer />
    </main>
  )
}
