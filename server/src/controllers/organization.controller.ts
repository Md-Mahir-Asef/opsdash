import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { clerk } from "../utils/clerk";

export const getOrgMembers = async (req: Request, res: Response) => {
    try {
        const info = getAuth(req);
        const memberships =
            await clerk.organizations.getOrganizationMembershipList({
                organizationId: String(info.orgId),
            });
        res.sendApi(memberships);
    } catch (err) {
        console.log(err);
    }
};
