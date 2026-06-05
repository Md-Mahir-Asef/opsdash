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
        const limit = parseInt(req.query["limit"] as string) || 9;
        const skip = (page - 1) * limit;

        if (!info?.orgId) {
            return res.sendErr("Missing orgId");
        }

        const [projects, totalProjects] = await Promise.all([
            prisma.project.findMany({
                where: {
                    org_id: String(info.orgId),
                },
                take: limit,
                skip,
                orderBy: {
                    created_at: "desc",
                },
                include: {
                    _count: {
                        select: {
                            tasks: true,
                        },
                    },
                },
            }),
            prisma.project.count({
                where: {
                    org_id: String(info.orgId),
                },
            }),
        ]);

        logger.info(`GET All Projects for Organization ${info.orgId}`);
        res.sendApi({
            data: {
                projects,
                page,
                limit,
                totalProjects,
                totalPages: Math.ceil(totalProjects / limit),
            },
            message: "Projects retrieved successfully",
        });
    } catch (err) {
        logger.error(`Can't GET All Projects for Organization`, err);
        res.sendErr(err);
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const id = parseInt(req.params["id"] as string);
        if (!info?.orgId) return res.sendErr("Missing orgId");

        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                _count: { select: { tasks: true } },
            },
        });

        if (!project || String(project.org_id) !== String(info.orgId)) {
            return res.sendErr("Project not found");
        }

        res.sendApi({ data: project }, "Project retrieved successfully");
    } catch (err) {
        logger.error(`Can't GET Project by id`, err);
        res.sendErr(err);
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const id = parseInt(req.params["id"] as string);
        if (!info?.orgId) return res.sendErr("Missing orgId");

        // allow partial updates
        const updateData = createProjectSchema.partial().parse(req.body.data);

        const existing = await prisma.project.findUnique({ where: { id } });
        if (!existing || String(existing.org_id) !== String(info.orgId)) {
            return res.sendErr("Project not found");
        }

        const updated = await prisma.project.update({
            where: { id },
            data: updateData as any,
        });

        res.sendApi({ data: updated }, "Project updated successfully");
    } catch (err) {
        if (err instanceof z.ZodError) {
            logger.error("Zod Error in Update Project Controller", err);
            return res.sendErr(err.issues.map((i) => i.message).join(", "));
        }
        logger.error(`Can't UPDATE Project`, err);
        res.sendErr(err);
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const id = parseInt(req.params["id"] as string);
        if (!info?.orgId) return res.sendErr("Missing orgId");

        const existing = await prisma.project.findUnique({ where: { id } });
        if (!existing || String(existing.org_id) !== String(info.orgId)) {
            return res.sendErr("Project not found");
        }

        await prisma.project.delete({ where: { id } });

        res.sendApi({ data: { id } }, "Project deleted successfully");
    } catch (err) {
        logger.error(`Can't DELETE Project`, err);
        res.sendErr(err);
    }
};
