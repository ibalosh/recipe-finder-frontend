import './App.css'

import Header from "./components/Header.tsx";
import RecipeItem, {Recipe} from "./components/RecipeItem.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchRecipes} from "./utils/https.tsx";
import {useState} from "react";
import Pagination from "./components/Pagination.tsx";
import RecipePlaceholder from "./components/RecipePlaceholder.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['recipes', searchTerm, page],
        queryFn: ({ signal }) => fetchRecipes({ searchTerm, page, signal }),
    });

    function handleSearchRecipes(searchString: string) {
        setSearchTerm(searchString)
    }

    const showPagination = data && data.pagination && data.pagination.total_count > 0

    return (
    <>
        <Header handleSearchRecipes={handleSearchRecipes}/>

        <section className={isLoading ? 'loading' : ''}>
            {isError &&
              <ul id="recipes">
                <RecipePlaceholder message="Something went wrong" />
              </ul>
            }

            {isLoading && (
                <ul id="recipes">
                    {[...Array(10)].map((_, i) => (
                        <RecipePlaceholder key={i} />
                    ))}
                </ul>
            )}

            {!isLoading && data?.recipes?.length === 0 && (
                <ul id="recipes">
                    <RecipePlaceholder message="No recipes found. Try a different search!" />
                </ul>
            )}

            {!isLoading && data?.recipes?.length > 0 && (
                <ul id="recipes">
                    {data!.recipes.map((recipe: Recipe, index: number) => (
                        <RecipeItem key={index} recipe={recipe} />
                    ))}
                </ul>
            )}
        </section>

        {showPagination && <Pagination
            currentPage={data?.pagination.current_page}
            totalPages={data?.pagination.total_pages}
            totalCount={data?.pagination.total_count}
            nextPage={data?.pagination.next_page}
            prevPage={data?.pagination.prev_page}
            setPage={setPage}
        />}
        <Footer />
    </>
  )
}

export default App
