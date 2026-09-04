import { Router } from "express";
import organizationRoutes from "./organization.route";
import { getHealth, ping } from "../controllers/health.controller";
import projectRoutes from "./project.route";
import authRoutes from "./auth.route";
import taskRoutes from "./task.route";
import activityRoutes from "./activity-log.route";

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
routes.use("/project", projectRoutes);
routes.use("/task", taskRoutes);
routes.use("/auth", authRoutes);
routes.use("/activity", activityRoutes);

export default routes;
