import {useRef} from "react";
import * as React from "react";

type Props = {
    handleSearchRecipes: (searchString: string) => void
}

export default function Header({handleSearchRecipes}: Props) {
    const searchFieldRef = useRef<HTMLInputElement | null>(null);

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleSearchRecipes(searchFieldRef.current?.value || "");
        }
    }

    return (
        <header id="main-header">
            <div id="header-title">
                  <h1>Recipe Finder</h1>
            </div>
            <nav>
                <input
                    type="text"
                    placeholder="Search for recipes by ingredients..."
                    ref={searchFieldRef}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={() => handleSearchRecipes(searchFieldRef.current?.value || "")}>Search</button>
            </nav>
        </header>
    )
}
