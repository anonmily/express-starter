var mysql       = require('mysql'),
    environment = process.env.NODE_ENV,
    config      = require('./config');

console.log('NODE_ENV is: ' + environment);

if(environment === 'development'){
    var pool = mysql.createPool({
        connectionLimit: config.DB_POOL,
        port: config.DB_PORT,
        host: config.DB_HOST,
        user: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        debug: config.SHOW_DEBUG
    });
}
if(environment === 'production'){
    var pool = mysql.createPool({
        connectionLimit: config.DB_POOL,
        port: config.DB_PORT,
        host: config.DB_HOST,
        user: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        debug: config.SHOW_DEBUG
    });
}

module.exports = pool;