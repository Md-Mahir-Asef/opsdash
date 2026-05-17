import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import logger from "../utils/logger";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = getAuth(req);
        if (!auth.userId) {
            logger.info("Blocked unauthorized access");
            throw new Error(`\n Unauthorized \n Token: ${auth}`);
        }
        logger.info("User authenticated", auth.userId);
        next();
    } catch (err) {
        logger.error("Error in auth middleware", err);
        return res.sendErr("Unauthorized");
    }
};
