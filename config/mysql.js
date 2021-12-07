var mysql = require('mysql2/promise');

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recruitment',
    waitForConnections: true,
    queueLimit: 0
});

module.exports = con;