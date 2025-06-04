import {useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import "./Header.css"

export default function Header() {
    const [searchFieldValue, setSearchFieldValue] = useState("")
    const navigate = useNavigate();

    function submitSearch() {
        navigate(`/?search=${encodeURIComponent(searchFieldValue)}`);
    }

    function resetSearch() {
        setSearchFieldValue("")
        navigate("/")
    }

    // clicking enter while on page will auto initiate a search
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            submitSearch();
        }
    }

    return (
        <header id="main-header">
            <button id="header-title" onClick={resetSearch} className="logo">
                  <h1>Recipe Finder</h1>
            </button>
            <nav>
                <input
                    type="text"
                    value={searchFieldValue}
                    placeholder="Search for recipes by ingredients..."
                    onChange={(event) => setSearchFieldValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={submitSearch}>Search</button>
            </nav>
        </header>
    )
}
