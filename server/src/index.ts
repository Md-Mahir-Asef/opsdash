import app from "./app";
import { config } from "./utils/config";
import logger from "./utils/logger";

const port = config.SERVER_PORT || 6145;

app.listen(port, "0.0.0.0", () => {
    logger.info(`Server is running on http://localhost:${port}`);
});
