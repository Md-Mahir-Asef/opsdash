import { Router } from "express";
import {
    getAllOrgProjectsByPage,
    createProject,
} from "../controllers/project.controller";
import { isUser } from "../middlewares/auth.middleware";

const projectRoutes = Router();

projectRoutes.get("/", isUser, getAllOrgProjectsByPage);
projectRoutes.post("/", isUser, createProject);

export default projectRoutes;
