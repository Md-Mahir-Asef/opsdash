import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import logger from "../utils/logger";
import { createProjectSchema } from "../utils/zod";
import prisma from "../utils/prisma";

export const createProject = async (req: Request, res: Response) => {
    try {
        const info = getAuth(req);
        const projectData = createProjectSchema.parse(req.body.data);
        const newProject = await prisma.project.create({
            data: projectData,
        });
        logger.info(`POST Create Project for Organization ${info.orgId}`);
        res.sendApi({
            data: newProject,
            message: "Project created successfully",
        });
    } catch (err) {
        logger.error(`Can't POST Create Project for Organization`, err);
        res.sendErr(err);
    }
};

export const getAllOrgProjectsByPage = async (req: Request, res: Response) => {
    try {
        const info = getAuth(req);

        if (!info?.orgId) {
            return res.sendErr("Missing orgId");
        }

        const projects = await prisma.project.findMany({
            where: {
                org_id: String(info.orgId),
            },
        });
        
        console.log(projects);
        logger.info(`GET All Projects for Organization ${info.orgId}`);
        res.sendApi({
            data: [],
            message: "Projects retrieved successfully",
        });
    } catch (err) {
        logger.error(`Can't GET All Projects for Organization`, err);
        res.sendErr(err);
    }
};
