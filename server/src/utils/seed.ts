import { faker } from "@faker-js/faker";
import prisma from "./prisma";
import { clerk } from "./clerk";
import { config } from "./config";
import logger from "./logger";
import { Status } from "../generated";

const STATUSES: Status[] = [
    Status.Unconfirmed,
    Status.Todo,
    Status.InProgress,
    Status.Done,
];

const daysFromNow = (days: number): Date =>
    new Date(Date.now() + days * 86400000);

const getClientEmailsForOrg = async (orgId: string): Promise<string[]> => {
    const membershipsResponse =
        await clerk.organizations.getOrganizationMembershipList({
            organizationId: String(orgId),
        });
    const memberships = Array.from(membershipsResponse.data);
    return memberships
        .filter((membership) => membership.role === "org:client")
        .map((membership) => membership.publicUserData?.identifier)
        .filter((email): email is string => Boolean(email));
};

const generateProjectsForOrg = async (orgId: string): Promise<void> => {
    const clientEmails = await getClientEmailsForOrg(orgId);
    const fallbackEmail = faker.internet.email();
    const getClientEmail = (): string =>
        clientEmails.length > 0
            ? faker.helpers.arrayElement(clientEmails)
            : fallbackEmail;

    const startDate = faker.date.past({ years: 1 });

    for (let i = 0; i < 5; i++) {
        await prisma.project.create({
            data: {
                org_id: String(orgId),
                title: faker.company.catchPhrase(),
                description: faker.lorem.paragraph(),
                status: faker.helpers.arrayElement(STATUSES),
                client_email: getClientEmail(),
                due_date: daysFromNow(faker.number.int({ min: 1, max: 90 })),
                start_date: startDate,
                end_date: daysFromNow(faker.number.int({ min: 30, max: 120 })),
                budget: faker.number.int({ min: 1000, max: 90000 }),
            },
        });
    }
    logger.info(`Seeded 5 projects for organization ${orgId}`);
};

export const seedProjects = async (): Promise<void> => {
    if (config.NODE_ENV !== "development") {
        logger.info("Skipping project seeding (not in development mode).");
        return;
    }

    try {
        const orgsResponse =
            await clerk.organizations.getOrganizationList({ limit: 100 });
        const orgs = Array.from(orgsResponse.data);

        if (orgs.length === 0) {
            logger.warn("No organizations found. Nothing to seed.");
            return;
        }

        logger.info(`Seeding projects for ${orgs.length} organization(s)...`);
        for (const org of orgs) {
            await generateProjectsForOrg(org.id);
        }
        logger.info("Project seeding completed.");
    } catch (error) {
        logger.error("Project seeding failed.", error);
    }
};
