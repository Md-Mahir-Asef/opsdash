import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/react-router";
import { config } from "./utils/config.ts";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ClerkProvider publishableKey={config.VITE_CLERK_PUBLISHABLE_KEY}>
            <RouterProvider router={router} />
        </ClerkProvider>
    </StrictMode>,
);
