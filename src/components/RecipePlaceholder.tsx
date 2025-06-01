import './RecipePlaceholder.css';

export default function RecipePlaceholder({ message, items}: { message?: string, items?: number }) {
    const elements = items ? items : 1;

    return (
        <ul id="recipes">
            {[...Array(elements)].map((_, i) => (
                <li key={i} className="recipe-placeholder">
                    <div className="recipe-image-skeleton" />
                    <div className="recipe-text-skeleton">
                        <div className="line short" />
                        <div className="line long" />
                        <div className="line medium" />
                        {message && <p className="no-data-message">{message}</p>}
                    </div>
                </li>)
            )}
        </ul>
    );
}
