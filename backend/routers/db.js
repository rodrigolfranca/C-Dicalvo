const Pool = require("pg").Pool;
require("dotenv-safe").config();

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT
});

module.exports = pool;