var mysql  = require('mysql');

// Extract host and port from socket address
const dbSocketAddr = process.env.DB_HOST.split(':');

// Establish a connection to the database
const pool =  mysql.createPool({
    connectionLimit : 10,
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    host: dbSocketAddr[0], // e.g. '127.0.0.1'
    port: dbSocketAddr[1], // e.g. '3306'

});

module.exports = pool;


