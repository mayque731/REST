var mysql = require('mysql');

var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": "root", //process.env.MYSQL_USER
    "password":"root",//process.env.MYSQL_PASSWORD
    "database":"ecommerce",//process.env.MYSQL_DATABASE
    "host":"localhost",//process.env.MYSQL_HOST
    "port":"3306"//process.env.MYSQL_PORT
});

exports.pool = pool;

exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, conn) => {
            if (error) {
                reject(error);
            } else {
                pool.query(query, params, (error, result, fields) => {
                    
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}