import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/react-router";
import Loading from "../common/Loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded)
        return <Loading variant="full" message="Authenticating..." />;

    if (!isSignedIn) return <Navigate to="/sign-in" />;

    return <>{children}</>;
};
