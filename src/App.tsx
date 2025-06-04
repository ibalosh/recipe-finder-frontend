import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./utils/https.tsx";
import Home from "./pages/Home.tsx";
import RecipeDetails from "./pages/RecipeDetails.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/recipes/:id',
        element: <RecipeDetails />
    },
]);

function App() {
    return  <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />;
    </QueryClientProvider>

}

export default App
