// creat a pool connection to db
const pg = require( 'pg' );
// config for our db connection
const pool = new pg.Pool({
    database: "koala_holla",
    host: "localhost",
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
});



//exports
module.exports = pool;