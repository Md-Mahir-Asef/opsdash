import { Router } from "express";
import {
    getOrgMembers,
    getOrgMembersByPage,
    getOrgMembersCount,
} from "../controllers/organization.controller";
import { isUser } from "../middlewares/auth.middleware";

const organizationRoutes = Router();

organizationRoutes.get("/members", isUser, getOrgMembers);
organizationRoutes.get("/members/count", isUser, getOrgMembersCount);
organizationRoutes.get("/members/page", isUser, getOrgMembersByPage);

export default organizationRoutes;
