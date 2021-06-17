var mysql      = require('mysql');

const createTcpPool = async config => {

    // Establish a connection to the database
    return await mysql.createPool({
        user: process.env.DB_USER, // e.g. 'my-db-user'
        password: process.env.DB_PASS, // e.g. 'my-db-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
        socketPath : `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    });
};


createTcpPool()

