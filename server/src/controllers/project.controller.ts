import type { Request, Response } from "express";
import logger from "../utils/logger";
import { createProjectSchema } from "../utils/zod";
import prisma from "../utils/prisma";
import z from "zod";
import { getAuthContext } from "../utils/auth";

export const createProject = async (req: Request, res: Response) => {
    try {
        logger.info("Hit createProject function in POST /api/v1/project");
        const info = await getAuthContext(req);
        logger.info(`Body > Data: ${JSON.stringify(req.body.data)}`);
        const projectData = createProjectSchema.parse(req.body.data);
        const newProject = await prisma.project.create({
            data: { ...projectData, org_id: String(info.orgId) },
        });
        logger.info(`POST Create Project for Organization ${info.orgId}`);
        res.sendApi({
            data: newProject,
            message: "Project created successfully",
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            logger.error("Zod Error in Create Project Controller");
            logger.error(
                `Invalid Data Format of Create Project. Zod Error: ${err.message}`,
            );
            return res.sendErr(
                err.issues.map((issue) => issue.message).join(", "),
            );
        }
        logger.error(`Can't POST Create Project for Organization`, err);
        res.sendErr(err);
    }
};

export const getAllOrgProjectsByPage = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const page = parseInt(req.query["page"] as string) || 1;
        const limit = parseInt(req.query["limit"] as string) || 10;
        const skip = (page - 1) * limit;

        if (!info?.orgId) {
            return res.sendErr("Missing orgId");
        }

        const projects = await prisma.project.findMany({
            where: {
                org_id: String(info.orgId),
            },
            take: limit,
            skip,
        });

        console.log(projects);
        logger.info(`GET All Projects for Organization ${info.orgId}`);
        res.sendApi({
            data: projects,
            message: "Projects retrieved successfully",
        });
    } catch (err) {
        logger.error(`Can't GET All Projects for Organization`, err);
        res.sendErr(err);
    }
};
