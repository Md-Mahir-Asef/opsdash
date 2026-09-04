import type { Request, Response } from "express";
import logger from "../utils/logger";
import { createTaskSchema } from "../utils/zod";
import prisma from "../utils/prisma";
import z from "zod";
import { getAuthContext } from "../utils/auth";
import { logActivity } from "../services/activity-log.service";

export const createTask = async (req: Request, res: Response) => {
    try {
        logger.info("Hit createTask function in POST /api/v1/task");
        const info = await getAuthContext(req);
        const taskData = createTaskSchema.parse(req.body.data);
        logger.info(`Parsed Task Data:`, taskData);

        // Verify that the project exists in the organization
        const project = await prisma.project.findUnique({
            where: { id: taskData.project_id },
        });

        logger.info(`Project found: `, project);

        if (!project || String(project.org_id) !== String(info.orgId)) {
            logger.warn(
                `Project ${taskData.project_id} not found in organization ${info.orgId}`,
            );
            return res.sendErr(
                `Project with id ${taskData.project_id} does not exist in your organization`,
            );
        }

        const newTask = await prisma.task.create({
            data: taskData,
        });

        logActivity({
            action: "Created",
            entity: "Task",
            entityId: newTask.id,
            orgId: String(info.orgId),
            actorId: info.userId ?? undefined,
            metadata: {
                title: newTask.title,
                project_id: newTask.project_id,
                assigned_staff_email: newTask.assigned_staff_email,
                priority: newTask.priority,
                status: newTask.status,
            },
        });

        logger.info(`POST Created Task for Organization ${info.orgId}`);
        res.sendApi({
            data: newTask,
            message: "Task created successfully",
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            logger.error("Zod Error in Create Task Controller");
            logger.error(
                `Invalid Data Format of Create Task. Zod Error: ${err.message}`,
            );
            return res.sendErr(
                err.issues.map((issue) => issue.message).join(", "),
            );
        }
        logger.error(`Can't POST Create Task for Organization`, err);
        res.sendErr(err);
    }
};

export const getAllTasksByPage = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const page = parseInt(req.query["page"] as string) || 1;
        const limit = parseInt(req.query["limit"] as string) || 9;
        const skip = (page - 1) * limit;
        const projectId = req.query["projectId"]
            ? parseInt(req.query["projectId"] as string)
            : undefined;

        if (!info?.orgId) {
            return res.sendErr("Missing orgId");
        }

        // If filtering by project, verify the project belongs to the organization
        if (projectId) {
            const project = await prisma.project.findUnique({
                where: { id: projectId },
            });
            if (!project || String(project.org_id) !== String(info.orgId)) {
                logger.warn(
                    `Project ${projectId} not found in organization ${info.orgId}`,
                );
                return res.sendErr("Project not found");
            }
        }

        const where = {
            project: {
                org_id: String(info.orgId),
            },
            ...(projectId ? { project_id: projectId } : {}),
        };

        const [tasks, totalTasks] = await Promise.all([
            prisma.task.findMany({
                where,
                take: limit,
                skip,
                orderBy: {
                    created_at: "desc",
                },
                include: {
                    project: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
            }),
            prisma.task.count({
                where,
            }),
        ]);

        logger.info(
            `GET ${projectId ? `Tasks for Project ${projectId} ` : "All Tasks "}for Organization ${info.orgId}`,
        );
        logger.info("The Tasks: ", tasks);
        res.sendApi({
            data: {
                tasks,
                page,
                limit,
                totalTasks,
                totalPages: Math.ceil(totalTasks / limit),
            },
            message: "Tasks retrieved successfully",
        });
    } catch (err) {
        logger.error(`Can't GET All Tasks for Organization`, err);
        res.sendErr(err);
    }
};

export const getAllTasksByProject = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const projectId = parseInt(req.params["projectId"] as string);
        if (!info?.orgId) return res.sendErr("Missing orgId");

        // Verify the project belongs to the organization
        const project = await prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project || String(project.org_id) !== String(info.orgId)) {
            return res.sendErr("Project not found");
        }

        const tasks = await prisma.task.findMany({
            where: {
                project_id: projectId,
            },
            orderBy: {
                created_at: "desc",
            },
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        logger.info(
            `GET All Tasks for Project ${projectId} in Organization ${info.orgId}`,
        );
        res.sendApi({
            data: tasks,
            message: "Tasks retrieved successfully",
        });
    } catch (err) {
        logger.error(`Can't GET All Tasks for Project`, err);
        res.sendErr(err);
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        logger.info("Hit getTaskById function in GET /api/v1/task/:id");
        const info = await getAuthContext(req);
        logger.info(`Auth Context:`, info);
        const id = parseInt(req.params["id"] as string);
        if (!info?.orgId) return res.sendErr("Missing orgId");

        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                        org_id: true,
                    },
                },
            },
        });

        if (
            !task ||
            !task.project ||
            String(task.project.org_id) !== String(info.orgId)
        ) {
            return res.sendErr("Task not found");
        }

        res.sendApi({ data: task }, "Task retrieved successfully");
    } catch (err) {
        logger.error(`Can't GET Task by id`, err);
        res.sendErr(err);
    }
};

export const updateTaskById = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const id = parseInt(req.params["id"] as string);
        if (!info?.orgId) return res.sendErr("Missing orgId");

        // allow partial updates
        const updateData = createTaskSchema.partial().parse(req.body.data);

        // Verify the task exists and belongs to the organization
        const existing = await prisma.task.findUnique({
            where: { id },
            include: {
                project: {
                    select: {
                        org_id: true,
                    },
                },
            },
        });
        if (
            !existing ||
            !existing.project ||
            String(existing.project.org_id) !== String(info.orgId)
        ) {
            return res.sendErr("Task not found");
        }

        // If project_id is being updated, verify the new project belongs to the organization
        if (updateData.project_id) {
            const project = await prisma.project.findUnique({
                where: { id: updateData.project_id },
            });
            if (!project || String(project.org_id) !== String(info.orgId)) {
                logger.warn(
                    `Project ${updateData.project_id} not found in organization ${info.orgId}`,
                );
                return res.sendErr(
                    `Project with id ${updateData.project_id} does not exist in your organization`,
                );
            }
        }

        const updated = await prisma.task.update({
            where: { id },
            data: updateData as any,
        });

        const changedFields: Record<string, { from: unknown; to: unknown }> = {};
        for (const key of Object.keys(updateData)) {
            const k = key as keyof typeof updateData;
            const oldVal = (existing as Record<string, unknown>)[k];
            const newVal = updateData[k];
            if (oldVal !== newVal) {
                changedFields[k] = { from: oldVal, to: newVal };
            }
        }

        logActivity({
            action: "Updated",
            entity: "Task",
            entityId: id,
            orgId: String(info.orgId),
            actorId: info.userId ?? undefined,
            metadata: {
                changes: changedFields,
                title: existing.title,
                project_id: existing.project_id,
            },
        });

        res.sendApi({ data: updated }, "Task updated successfully");
    } catch (err) {
        if (err instanceof z.ZodError) {
            logger.error("Zod Error in Update Task Controller", err);
            return res.sendErr(err.issues.map((i) => i.message).join(", "));
        }
        logger.error(`Can't UPDATE Task`, err);
        res.sendErr(err);
    }
};

export const deleteTaskById = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const id = parseInt(req.params["id"] as string);
        if (!info?.orgId) return res.sendErr("Missing orgId");

        const existing = await prisma.task.findUnique({
            where: { id },
            include: {
                project: {
                    select: {
                        org_id: true,
                    },
                },
            },
        });
        if (
            !existing ||
            !existing.project ||
            String(existing.project.org_id) !== String(info.orgId)
        ) {
            return res.sendErr("Task not found");
        }

        await prisma.task.delete({ where: { id } });

        logActivity({
            action: "Deleted",
            entity: "Task",
            entityId: id,
            orgId: String(info.orgId),
            actorId: info.userId ?? undefined,
            metadata: {
                title: existing.title,
                project_id: existing.project_id,
            },
        });

        res.sendApi({ data: { id } }, "Task deleted successfully");
    } catch (err) {
        logger.error(`Can't DELETE Task`, err);
        res.sendErr(err);
    }
};
