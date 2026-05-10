import { Router } from "express";
import {
    getAllOrgProjectsByPage,
    createProject,
} from "../controllers/project.controller";
import { requireAuth } from "@clerk/express";

const projectRoutes = Router();

projectRoutes.get("/", requireAuth(), getAllOrgProjectsByPage);
projectRoutes.post("/", requireAuth(), createProject);

export default projectRoutes;
