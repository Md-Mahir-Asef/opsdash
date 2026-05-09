import { config } from "./config";
import { createClerkClient } from "@clerk/express";

export const clerk = createClerkClient({
    secretKey: config.CLERK_SECRET_KEY,
});
