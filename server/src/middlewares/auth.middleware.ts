import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import logger from "../utils/logger";
import { config } from "../utils/config";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = getAuth(req);
        if (
            config.NODE_ENV === "development" &&
            req.headers.authorization &&
            req.headers.authorization === config.DEV_TOKEN
        ) {
            logger.info("Access granted as a developer");
            return next();
        }
        if (!auth.userId) {
            logger.info("Blocked unauthorized access from auth.middleware.ts");
            throw new Error(`\n Unauthorized \n Token: ${auth}`);
        }
        logger.info("User authenticated", auth.userId);
        next();
    } catch (err) {
        logger.error("Error in auth middleware", err);
        return res.sendErr("Unauthorized");
    }
};
