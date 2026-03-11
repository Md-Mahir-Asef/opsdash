import { Router } from "express";
import { getOrganizationData, getOrganizationList } from "../controllers/organization.controller";
import { requireAuth } from "@clerk/express";

const organizationRoutes = Router();

organizationRoutes.get("/", requireAuth(), getOrganizationData);
organizationRoutes.get("/list", requireAuth(), getOrganizationList);

export default organizationRoutes;
