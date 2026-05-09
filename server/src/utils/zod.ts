import z from "zod";
import { Status } from "../generated";

export const createProjectSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.nativeEnum(Status).optional().default(Status.Unconfirmed),
    client_email: z.string().email(),
    due_date: z.date().optional(),
    start_date: z.date(),
    end_date: z.date(),
    budget: z.number(),
});
