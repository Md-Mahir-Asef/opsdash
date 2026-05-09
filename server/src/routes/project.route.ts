import { Router } from "express";
import {
    getAllProjects,
    createProject,
} from "../controllers/project.controller";
import { requireAuth } from "@clerk/express";

const projectRoutes = Router();

projectRoutes.get("/", requireAuth(), getAllProjects);
projectRoutes.post("/", requireAuth(), createProject);

export default projectRoutes;
