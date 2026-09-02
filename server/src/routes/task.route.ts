import { Router } from "express";
import {
    createTask,
    getAllTasksByPage,
    getAllTasksByProject,
    getTaskById,
    updateTaskById,
    deleteTaskById,
} from "../controllers/task.controller";
import { isUser } from "../middlewares/auth.middleware";

const taskRoutes = Router();

taskRoutes.get("/", isUser, getAllTasksByPage);
taskRoutes.get("/project/:projectId", isUser, getAllTasksByProject);
taskRoutes.get("/:id", isUser, getTaskById);
taskRoutes.post("/", isUser, createTask);
taskRoutes.put("/:id", isUser, updateTaskById);
taskRoutes.delete("/:id", isUser, deleteTaskById);

export default taskRoutes;