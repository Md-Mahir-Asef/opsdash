import z from "zod";
import { Status } from "../generated";

export const createProjectSchema = z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    status: z.nativeEnum(Status).optional().default(Status.Unconfirmed),
    client_email: z.string().email(),
    due_date: z.coerce.date({ error: "Due date is required" }),
    start_date: z.coerce.date({ error: "Start date is required" }),
    end_date: z.coerce.date({ error: "End date is required" }),
    budget: z.coerce.number({ error: "Budget must be a number." }),
});
