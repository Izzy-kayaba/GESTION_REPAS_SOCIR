const { Pool } = require('pg');

// PostgreSQL configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'GestionSocirDB',
    password: 'djuma2022',
    port: 5432,
});


// If your import is in CommonJS form then use module.exports
module.exports = { pool };



