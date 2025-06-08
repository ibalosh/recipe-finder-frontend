import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Header.css"

export default function Header() {
    const [searchFieldValue, setSearchFieldValue] = useState("")
    const [searchMode, setSearchMode] = useState<"ingredients" | "title">("ingredients");
    const navigate = useNavigate();

    function submitSearch() {
        navigate(`/?search=${encodeURIComponent(searchFieldValue)}&mode=${searchMode}`);
    }

    function resetSearch() {
        setSearchFieldValue("");
        setSearchMode("ingredients");
        navigate("/");
    }

    // clicking enter while on page will auto initiate a search
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            submitSearch();
        }
    }

    const placeholderValue = (searchMode === "ingredients") ? "Search for recipes by ingredients..." : "Search for recipes by title..."

    return (
        <header id="main-header">
            <button id="header-title" onClick={resetSearch} className="logo">
                <h1>Recipe Finder</h1>
            </button>
            <div className="search-toggle">
                <label>
                    <input
                        type="radio"
                        value="ingredients"
                        checked={searchMode === "ingredients"}
                        onChange={() => setSearchMode("ingredients")}
                    />
                    Ingredients
                </label>
                <label>
                    <input
                        type="radio"
                        value="title"
                        checked={searchMode === "title"}
                        onChange={() => setSearchMode("title")}
                    />
                    Title
                </label>
            </div>
            <nav>
                <input
                    type="text"
                    value={searchFieldValue}
                    placeholder={placeholderValue}
                    onChange={(event) => setSearchFieldValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={submitSearch}>Search</button>
            </nav>
        </header>
    )
}
