import { config as dotenvConfig } from "dotenv";
dotenvConfig({ override: false });

export const config = {
    SERVER_PORT: Number(process.env["SERVER_PORT"]) || 6145,
    NODE_ENV: process.env["NODE_ENV"] || "development",
    DATABASE_URL_DEVELOPMENT: process.env["DATABASE_URL_DEVELOPMENT"],
    SERVER_BCRYPT_SALT_ROUND: process.env["SERVER_BCRYPT_SALT_ROUND"],
    SERVER_JWT_SECRET: process.env["SERVER_JWT_SECRET"],
    CLIENT_URL_DEVELOPMENT: process.env["CLIENT_URL_DEVELOPMENT"],
};