require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost0: process.env.DB_HOST0,
    dbHost1: process.env.DB_HOST1,
    dbHost2: process.env.DB_HOST2,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    sentryDns: process.env.SENTRY_DNS,
    sentryId: process.env.SENTRY_ID,
    authAdminUserName: process.env.AUTH_ADMIN_USERNAME,
    authAdminPassport: process.env.AUTH_ADMIN_PASSPORT,
    authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
    authJwtSecret: process.env.AUTH_JWT_SECRET
}

module.exports = config;