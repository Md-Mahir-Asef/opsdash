import { Router } from "express";
import {
    getOrgMembers,
    getOrgMembersByPage,
    getOrgMembersCount,
} from "../controllers/organization.controller";
import { requireAuth } from "@clerk/express";

const organizationRoutes = Router();

organizationRoutes.get("/members", requireAuth(), getOrgMembers);
organizationRoutes.get("/members/count", requireAuth(), getOrgMembersCount);
organizationRoutes.get("/members/page", requireAuth(), getOrgMembersByPage);

export default organizationRoutes;
