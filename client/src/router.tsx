import { createBrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react-router";
import { config } from "./utils/config.ts";
import { Landing } from "./pages/Landing";
import Health from "./pages/Health";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/auth/DashboardPage";
import ProjectsPage from "./pages/auth/ProjectsPage";
import TasksPage from "./pages/auth/TasksPage";
import UsersPage from "./pages/auth/UsersPage";
import OrganizationsPage from "./pages/auth/OrganizationsPage";
import SettingsPage from "./pages/auth/SettingsPage";
import ReportsPage from "./pages/auth/ReportsPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.tsx";

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
        path: "/dashboard",
        element: (
            <ClerkLayout>
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            </ClerkLayout>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "projects",
                element: <ProjectsPage />,
            },
            {
                path: "tasks",
                element: <TasksPage />,
            },
            {
                path: "users",
                element: <UsersPage />,
            },
            {
                path: "organizations",
                element: <OrganizationsPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
            {
                path: "reports",
                element: <ReportsPage />,
            },
        ],
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
