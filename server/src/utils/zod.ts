import z from "zod";
import { Status } from "../generated";

export const createProjectSchema = z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    status: z.nativeEnum(Status).optional().default(Status.Unconfirmed),
    client_email: z.string().email(),
    due_date: z.date({ error: "Due date is required" }),
    start_date: z.date({ error: "Start date is required" }),
    end_date: z.date({ error: "End date is required" }),
    budget: z.number({ error: "Budget is required" }),
});
