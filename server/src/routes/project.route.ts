import { Router } from "express";
import {
    getAllOrgProjectsByPage,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/project.controller";
import { isUser } from "../middlewares/auth.middleware";

const projectRoutes = Router();

projectRoutes.get("/", isUser, getAllOrgProjectsByPage);
projectRoutes.post("/", isUser, createProject);
projectRoutes.get("/:id", isUser, getProjectById);
projectRoutes.put("/:id", isUser, updateProject);
projectRoutes.delete("/:id", isUser, deleteProject);

export default projectRoutes;
