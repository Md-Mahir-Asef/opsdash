import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";
import { config } from "./config";
import logger from "./logger";

const connectionString = `${process.env?.["DATABASE_URL"]}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const connectionCheckDb = async () => {
    try {
        const dbUrl = config.DATABASE_URL_DEVELOPMENT;
        const [sizeResult] = await prisma.$queryRaw<
            { size: string }[]
        >`SELECT pg_size_pretty(pg_database_size(current_database())) as size`;
        logger.info(`Database size is ${sizeResult?.size}`);
        const [nameResult] = await prisma.$queryRaw<
            { name: string }[]
        >`SELECT current_database()::text as name`;
        logger.info(`Database name is ${nameResult?.name}`);
        logger.info(
            `Prisma is connected to DB: ${nameResult?.name} at ${dbUrl}. Database size: ${sizeResult?.size}`,
        );
    } catch (error) {
        logger.warn(
            `ERROR ON PRISMA INITIAL CONNECTION AND INITIAL HEALTH CHECK.\nCan't connect to DB. ${error}`,
        );
    }
};

export default prisma;
