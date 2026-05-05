import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { clerk } from "../utils/clerk";
import logger from "../utils/logger";
import type { OrganizationMembership } from "@clerk/clerk-sdk-node";

export const getOrgMembers = async (req: Request, res: Response) => {
    try {
        const info = getAuth(req);
        const memberships: OrganizationMembership[] =
            await clerk.organizations.getOrganizationMembershipList({
                organizationId: String(info.orgId),
            });
        logger.info(`GET Membership Details for Organization ${info.orgId}`);
        res.sendApi(memberships);
    } catch (err) {
        console.log(err);
    }
};
