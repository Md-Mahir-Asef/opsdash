import { Clerk } from "@clerk/clerk-sdk-node";
import { config } from "./config";

export const clerk = Clerk({ apiKey: config.CLERK_SECRET_KEY });
