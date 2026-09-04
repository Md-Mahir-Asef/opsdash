import { seedProjects } from "../src/utils/seed";
import logger from "../src/utils/logger";

(async () => {
    try {
        await seedProjects();
        logger.info("Database Seeded.");
    } catch (error) {
        logger.error("Database seeding failed.", error);
        process.exit(1);
    }
})();
