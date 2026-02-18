import {useState, KeyboardEvent} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Header.module.css";

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
    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            submitSearch();
        }
    }

    const placeholderValue = (searchMode === "ingredients") ? "Search for recipes by ingredients..." : "Search for recipes by title..."

    return (
        <header className={styles.main}>
            <button onClick={resetSearch} className={`${styles.logo} ${styles.title}`}>
                <h1>Recipe Finder</h1>
            </button>
            <div className={styles.searchToggle}>
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
            <nav className={styles.searchNav}>
                <input
                    type="text"
                    value={searchFieldValue}
                    placeholder={placeholderValue}
                    onChange={(event) => setSearchFieldValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.searchInput}
                />
                <button onClick={submitSearch} className={styles.searchButton}>Search</button>
            </nav>
        </header>
    )
}
