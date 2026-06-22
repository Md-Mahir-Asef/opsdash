import { clerk } from "./clerk";
import logger from "./logger";

export const getClientEmailsInAnOrg = async (orgId: string) => {
    try {
        const membershipsResponse =
            await clerk.organizations.getOrganizationMembershipList({
                organizationId: String(orgId),
            });
        const memberships = Array.from(membershipsResponse.data);
        const clients = [];
        for (const membership of memberships) {
            if (membership.role === "org:client") {
                clients.push(membership.publicUserData?.identifier);
            }
        }
        return clients;
    } catch (err) {
        logger.error(`Can't GET Clients for Organization ${orgId}.`, err);
        throw err;
    }
};
