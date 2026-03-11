import express from "express";
import routes from "./routes/index.route";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import cookieParser from "cookie-parser";
import { responseWrapper } from "./middlewares/responseWrapper.middleware";
import { config } from "./utils/config";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../src/utils/swagger";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(cookieParser());
app.use(
    cors({
        origin: config.CLIENT_URL_DEVELOPMENT,
        credentials: true,
    }),
);
app.use(express.json());
app.use(clerkMiddleware());
app.use(responseWrapper);
app.use(requestLogger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", routes);

export default app;
