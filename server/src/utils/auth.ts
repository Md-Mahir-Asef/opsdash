import { getAuth } from "@clerk/express";
import { Request } from "express";
import { config } from "./config";
import logger from "./logger";

export const getAuthContext = (req: Request) => {
    const auth = getAuth(req);
    if (
        !auth?.userId &&
        config.NODE_ENV === "development" &&
        req.headers.authorization &&
        req.headers.authorization === config.DEV_TOKEN
    ) {
        const mockAuthContext = {
            userId: "dev-user-id",
            sessionId: "dev-session-id",
            orgId: "org_3D6faFExoJxxidGjQ81Qi4jZcDy",
        };
        logger.info(
            "Development mode: Returning mock auth context. Mock Auth Context: " +
                JSON.stringify(mockAuthContext),
        );
        return mockAuthContext;
    }
    logger.info(`Actual Auth Context: ${JSON.stringify(auth)}`);
    return {
        userId: auth.userId,
        sessionId: auth.sessionId,
        orgId: auth.orgId,
    };
};
