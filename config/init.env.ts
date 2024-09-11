import dotenv from "dotenv";
dotenv.config();

export default {
    // Database
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'st-auth-typescript',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',

    // Auth
    SECRET: process.env.SECRET || 'st-auth-typescript-secret-key',
    EXPIRATION: process.env.EXPIRATION || 3600,
    REFRESH_EXPIRATION: process.env.REFRESH_EXPIRATION || 86400,

    // Config
    PORT: process.env.PORT || 4000,
    CORSURL: process.env.CORSURL || 'http://localhost:5000',

    // Environment
    ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
    DB_FORCE_SYNC: process.env.DB_FORCE_SYNC || true
};