import type { Request, Response } from "express";
import logger from "../utils/logger";
import prisma from "../utils/prisma";
import { getAuthContext } from "../utils/auth";

export const getAllActivitiesByPage = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const page = parseInt(req.query["page"] as string) || 1;
        const limit = parseInt(req.query["limit"] as string) || 25;
        const skip = (page - 1) * limit;

        if (!info?.orgId) {
            return res.sendErr("Missing orgId");
        }

        const [activities, totalActivities] = await Promise.all([
            prisma.activityLog.findMany({
                where: {
                    org_id: String(info.orgId),
                },
                take: limit,
                skip,
                orderBy: {
                    created_at: "desc",
                },
            }),
            prisma.activityLog.count({
                where: {
                    org_id: String(info.orgId),
                },
            }),
        ]);

        logger.info(`GET All Activities for Organization ${info.orgId}`);
        res.sendApi({
            data: {
                activities,
                page,
                limit,
                totalActivities,
                totalPages: Math.ceil(totalActivities / limit),
            },
            message: "Activities retrieved successfully",
        });
    } catch (err) {
        logger.error(`Can't GET All Activities for Organization`, err);
        res.sendErr(err);
    }
};
