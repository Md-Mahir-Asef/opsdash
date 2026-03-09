export const config = {
    VITE_SERVER_DEVELOPMENT_BASE_URL: import.meta.env
        .VITE_SERVER_DEVELOPMENT_BASE_URL,
    VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: import.meta.env.CLERK_SECRET_KEY,
};
