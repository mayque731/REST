var mysql = require('mysql');

var pool = mysql.createPool({
    "user": "root", //process.env.MYSQL_USER
    "password":"root",//process.env.MYSQL_PASSWORD
    "database":"ecommerce",//process.env.MYSQL_DATABASE
    "host":"localhost",//process.env.MYSQL_HOST
    "port":"3306"//process.env.MYSQL_PORT
});

exports.pool = pool;