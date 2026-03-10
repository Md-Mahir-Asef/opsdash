import { createBrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react-router";
import { config } from "./utils/config.ts";
import { Landing } from "./pages/Landing";
import Health from "./pages/Health";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage";

// Layout component that wraps children with ClerkProvider
const ClerkLayout = ({ children }: { children: React.ReactNode }) => (
    <ClerkProvider
        publishableKey={config.VITE_CLERK_PUBLISHABLE_KEY}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
    >
        {children}
    </ClerkProvider>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ClerkLayout>
                <Landing />
            </ClerkLayout>
        ),
    },
    {
        path: "/landing",
        element: (
            <ClerkLayout>
                <Landing />
            </ClerkLayout>
        ),
    },
    {
        path: "/health",
        element: (
            <ClerkLayout>
                <Health />
            </ClerkLayout>
        ),
    },
    {
        path: "/sign-in/*",
        element: (
            <ClerkLayout>
                <SignInPage />
            </ClerkLayout>
        ),
    },
    {
        path: "/sign-up/*",
        element: (
            <ClerkLayout>
                <SignUpPage />
            </ClerkLayout>
        ),
    },
    {
        path: "*",
        element: (
            <ClerkLayout>
                <NotFoundPage />
            </ClerkLayout>
        ),
    },
]);
