import type { Request, Response } from "express";
import { clerk } from "../utils/clerk";
import logger from "../utils/logger";
import type { OrganizationMembership } from "@clerk/express";
import { getAuthContext } from "../utils/auth";

export const getMemberRoleInOrg = async (req: Request, res: Response) => {
    try {
        const info = await getAuthContext(req);
        const membershipsResponse =
            await clerk.organizations.getOrganizationMembershipList({
                organizationId: String(info.orgId),
                userId: [String(info.userId)],
            });
        const memberships: OrganizationMembership[] = membershipsResponse.data;
        console.log(memberships);
        logger.info(`GET Member Role in Organization ${info.orgId}`);
        res.sendApi(memberships);
    } catch (err) {
        logger.error(`Can't GET Member Role in Organization`, err);
        res.sendErr(err);
    }
};
