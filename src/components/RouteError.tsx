import { useRouteError } from "react-router-dom";
import "./RouteError.css";

export default function RouteError() {
    const error = useRouteError() as Error;

    return (
        <div className="route-error">
            <h2>🚨 Oops! Something went wrong.</h2>
            <p>{error.message || "An unexpected error occurred."}</p>
        </div>
    );
}
