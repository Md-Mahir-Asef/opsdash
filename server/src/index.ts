import app from "./app";
import { config } from "./utils/config";
import logger from "./utils/logger";
import { connectionCheckDb } from "./utils/prisma";
import { seedProjects } from "./utils/seed";
import http from "http";
import { createSocketServer } from "./socket/index";

const httpServer = http.createServer(app);

const io = createSocketServer(httpServer);

const port = config.SERVER_PORT || 6145;

httpServer.listen(port, "0.0.0.0", async () => {
    logger.info(`Server is running on http://localhost:${port}`);
    await connectionCheckDb();
    if (config.NODE_ENV === "development") {
        await seedProjects();
    }
});
