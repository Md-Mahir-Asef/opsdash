import { Router } from "express";
import { getAllActivitiesByPage } from "../controllers/activity-log.controller";
import { isUser } from "../middlewares/auth.middleware";

const activityRoutes = Router();

activityRoutes.get("/", isUser, getAllActivitiesByPage);

export default activityRoutes;
