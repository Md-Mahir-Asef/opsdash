import { Router } from "express";
import organizationRoutes from "./organization.route";
import { getHealth, ping } from "../controllers/health.controller";

const routes = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Check API health status
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *       503:
 *         description: Service unavailable
 */
routes.get("/health", getHealth);

/**
 * @swagger
 * /api/v1/health/ping:
 *   get:
 *     summary: Simple ping endpoint
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is responsive
 */
routes.get("/health/ping", ping);

routes.use("/organization", organizationRoutes);

export default routes;
