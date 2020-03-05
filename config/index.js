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
    dbName: process.env.DB_NAME
}

module.exports = config;