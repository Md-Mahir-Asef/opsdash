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

        res.status(200).json(healthData);
    } catch (error) {
        res.status(503).json({
            error: "Service unavailable",
            timestamp: new Date().toISOString(),
        });
    }
};

export const ping = (req: Request, res: Response) => {
    res.status(200).json({
        pong: true,
        timestamp: new Date().toISOString(),
    });
};
