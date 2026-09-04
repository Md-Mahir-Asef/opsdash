import z from "zod";

export const createProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().default(""),
    status: z
        .enum(["Unconfirmed", "Todo", "InProgress", "Done"])
        .optional()
        .default("Unconfirmed"),
    client_email: z.string().email("Invalid email address"),
    start_date: z.coerce.date({ error: "Start date is required" }),
    due_date: z.coerce.date({ error: "Due date is required" }),
    end_date: z.coerce.date({ error: "End date is required" }).optional(),
    budget: z.coerce.number({ error: "Budget must be a number" }),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const createTaskSchema = z.object({
    project_id: z.coerce.number({ error: "Project ID is required" }),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().default(""),
    status: z
        .enum(["Unconfirmed", "Todo", "InProgress", "Done"])
        .optional()
        .default("Unconfirmed"),
    assigned_staff_email: z.string().email("Invalid staff email"),
    priority: z
        .enum(["High", "Medium", "Low", "NotSet"])
        .optional()
        .default("NotSet"),
    due_date: z.coerce.date().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
