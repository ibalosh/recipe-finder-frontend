import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/utils/https.ts";
import HomePage from "@/pages/HomePage.tsx";
import RecipeDetails from "@/pages/RecipePage.tsx";
import RootLayout from "@/pages/Root.tsx";
import RouteError from "@/components/feedback/RouteError.tsx";

/**
 * Routing plan for the pages
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <RouteError />,
        children: [
            {
                index: true,
                element: <HomePage />,
                errorElement: <RouteError />
            },
            {
                path: '/recipes/:id',
                element: <RecipeDetails />,
                errorElement: <RouteError />
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
