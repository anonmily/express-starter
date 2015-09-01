var mysql      = require('mysql');
var environment = process.env.NODE_ENV;
console.log('NODE_ENV is: ' + environment);

if(environment === 'development'){
    var pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'root',
        debug: true
    });
}
if(environment === 'production'){
    var pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'root',
        debug: true
    });
}

module.exports = pool;