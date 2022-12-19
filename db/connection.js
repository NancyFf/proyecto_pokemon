const mariadb = require("mariadb")

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONN_LIMIT,
}

const pool = mariadb.createPool(config)

module.exports = pool