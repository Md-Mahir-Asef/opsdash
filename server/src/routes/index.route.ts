import { Router } from "express";
import { getHealth, ping } from "../controllers/health.controller";

const routes = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Check API health status
 *     description: Returns the current health status of the API server including uptime, memory usage, and environment information.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *       503:
 *         description: Service unavailable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Service unavailable"
 */
routes.get("/health", getHealth);

/**
 * @swagger
 * /api/v1/health/ping:
 *   get:
 *     summary: Simple ping endpoint
 *     description: A lightweight endpoint to check if the server is responsive. Returns minimal response for quick health checks.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is responsive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pong:
 *                   type: boolean
 *                   example: true
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-03-08T21:01:00.000Z"
 */
routes.get("/health/ping", ping);

export default routes;
