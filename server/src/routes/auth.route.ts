import { Router } from "express";
import { getMemberRoleInOrg } from "../controllers/auth.controller";
import { isUser } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.get("/member-role", isUser, getMemberRoleInOrg);

export default authRoutes;
