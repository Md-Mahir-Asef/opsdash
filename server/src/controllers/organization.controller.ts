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
        logger.error(`Can't GET Membership Details for Organization`, err);
        res.sendErr(err);
    }
};

export const getOrgMembersByPage = async (req: Request, res: Response) => {
    try {
        const info = getAuth(req);
        const page = parseInt(req.query["page"] as string) || 1;
        const limit = 5;

        const memberships: OrganizationMembership[] =
            await clerk.organizations.getOrganizationMembershipList({
                organizationId: String(info.orgId),
                offset: (page - 1) * limit,
                limit: limit,
            });

        logger.info(
            `GET Page ${page} of Membership Details for Organization ${info.orgId}`,
        );
        res.sendApi({
            members: memberships,
            pagination: {
                page,
            },
        });
    } catch (err) {
        logger.error(
            `Can't GET Page of Membership Details for Organization.`,
            err,
        );
        res.sendErr(err);
    }
};

export const getOrgMembersCount = async (req: Request, res: Response) => {
    try {
        const info = getAuth(req);

        const org = await clerk.organizations.getOrganizationMembershipList({
            organizationId: String(info.orgId),
        });

        // Count members by role
        const roleCounts = org.reduce(
            (acc, member) => {
                const roleName = member.role.slice(4); // Remove 'org:' prefix
                acc[roleName] = (acc[roleName] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );

        logger.info(
            `GET Members Count ${org.length} for Organization ${info.orgId}`,
        );
        logger.info(
            `Admins: ${roleCounts["admin"] || 0}; Staffs: ${roleCounts["staff"] || 0}; Clients: ${roleCounts["client"] || 0}`,
        );
        res.sendApi({
            members: org.length,
            admins: roleCounts["admin"] || 0,
            staff: roleCounts["staff"] || 0,
            clients: roleCounts["client"] || 0,
        });
    } catch (err) {
        logger.error(`Can't GET Membership Count for Organization.`, err);
        res.sendErr(err);
    }
};
