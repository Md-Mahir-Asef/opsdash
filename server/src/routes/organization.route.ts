import { Router } from "express";
import { getOrgMembers } from "../controllers/organization.controller";
import { requireAuth } from "@clerk/express";

const organizationRoutes = Router();

organizationRoutes.get("/members", requireAuth(), getOrgMembers);

export default organizationRoutes;
