import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import Health from "./pages/Health";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/landing",
        element: <Landing />,
    },
    {
        path: "/health",
        element: <Health />,
    },
]);
