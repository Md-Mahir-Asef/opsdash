import { Router } from "express";
import {
    getAllOrgProjectsByPage,
    createProject,
    getProjectById,
    updateProject,
} from "../controllers/project.controller";
import { isUser } from "../middlewares/auth.middleware";

const projectRoutes = Router();

projectRoutes.get("/", isUser, getAllOrgProjectsByPage);
projectRoutes.post("/", isUser, createProject);
projectRoutes.get("/:id", isUser, getProjectById);
projectRoutes.put("/:id", isUser, updateProject);

export default projectRoutes;
