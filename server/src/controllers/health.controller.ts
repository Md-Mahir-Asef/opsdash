import { Request, Response } from "express";

export const getHealth = (req: Request, res: Response) => {
    try {
        const uptime = process.uptime();
        const memoryUsage = process.memoryUsage();
        const timestamp = new Date().toISOString();

        const healthData = {
            status: "healthy",
            timestamp,
            uptime: Math.floor(uptime),
            version: "1.0.0",
            environment: process.env["NODE_ENV"] || "development",
            memory: {
                used: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
                total: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
                external: (memoryUsage.external / 1024 / 1024).toFixed(2),
                rss: (memoryUsage.rss / 1024 / 1024).toFixed(2),
            },
        };

        res.sendApi(healthData, "Server is healthy and running", 200);
    } catch (error) {
        res.sendErr("Service unavailable", "Service unavailable", 503);
    }
};

export const ping = (req: Request, res: Response) => {
    res.sendApi({ pong: true }, "Server is responsive", 200);
};
