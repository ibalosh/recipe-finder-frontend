import './RecipePlaceholder.css';

export default function RecipePlaceholder({ message }: { message?: string }) {
    return (
        <div className="recipe-placeholder-container">
            {message && <p className="recipe-message">{message}</p>}
            <ul id="recipes">
                {[...Array(16)].map((_, i) => (
                    <li key={i} className="recipe-placeholder">
                        <div className="recipe-image-skeleton" />
                        <div className="recipe-text-skeleton">
                            <div className="line short" />
                            <div className="line long" />
                            <div className="line medium" />
                        </div>
                    </li>)
                )}
            </ul>
        </div>
    );
}
