import { Router } from "express";
import {
    getAllOrgProjectsByPage,
    getAllOrgProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/project.controller";
import { isUser } from "../middlewares/auth.middleware";

const projectRoutes = Router();

projectRoutes.get("/",     isUser, getAllOrgProjectsByPage);
projectRoutes.get("/all",  isUser, getAllOrgProjects);
projectRoutes.post("/",    isUser, createProject);
projectRoutes.get("/:id", isUser, getProjectById);
projectRoutes.put("/:id", isUser, updateProject);
projectRoutes.delete("/:id", isUser, deleteProject);

export default projectRoutes;
