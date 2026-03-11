import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/react-router";
import Loading from "../common/Loading";
import React, { createContext, useContext } from "react";
import type { UseAuthReturn } from "@clerk/react-router/types";

const AuthContext = createContext<UseAuthReturn | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuthContext must be used within AuthProvider");
    return context;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useAuth();

    if (!user.isLoaded)
        return <Loading variant="full" message="Authenticating..." />;
    if (!user.isSignedIn) return <Navigate to="/sign-in" />;

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
