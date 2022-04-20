const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "123Kirito456",
    database: "cdicalvo_teste2",
    host: "localhost",
    port: "5432"    
});

module.exports = pool;