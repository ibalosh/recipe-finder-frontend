import './RecipePlaceholder.css';

export default function RecipePlaceholder({ message }: { message?: string }) {
    return (
        <li className="recipe-placeholder">
            <div className="recipe-image-skeleton" />
            <div className="recipe-text-skeleton">
                <div className="line short" />
                <div className="line long" />
                <div className="line medium" />
                {message && <p className="no-data-message">{message}</p>}
            </div>
        </li>
    );
}
