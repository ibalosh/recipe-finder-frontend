import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./utils/https.tsx";
import HomePage from "./pages/HomePage.tsx";
import RecipeDetails from "./pages/RecipePage.tsx";
import RootLayout from "./pages/Root.tsx";

/**
 * Routing plan for the pages
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/recipes/:id',
                element: <RecipeDetails />
            },
        ]
    }
]);

function App() {
    return  <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>

}

export default App
