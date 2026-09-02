import z from "zod";
import { Priority, Status } from "../generated";

export const createProjectSchema = z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    status: z.nativeEnum(Status).optional().default(Status.Unconfirmed),
    client_email: z.string().email(),
    due_date: z.coerce.date({ error: "Due date is required" }),
    start_date: z.coerce.date({ error: "Start date is required" }),
    end_date: z.coerce.date({ error: "End date is required" }).optional(),
    budget: z.coerce.number({ error: "Budget must be a number." }),
});

export const createTaskSchema = z.object({
    project_id: z.coerce.number({ error: "Project ID is required" }),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().default(""),
    status: z.nativeEnum(Status).optional().default(Status.Unconfirmed),
    assigned_staff_email: z.string().email("Invalid staff email"),
    priority: z.nativeEnum(Priority).optional().default(Priority.NotSet),
    due_date: z.coerce.date().optional(),
});
