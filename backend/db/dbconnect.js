const { sanitize } = require('express-validator');
var mysql = require('promise-mysql');

var config = {
  host: "localhost",
  user: "root",
  password: "password",
  port : "3306",
  database : "sample"
}

const getDbConnection = async () => {
  return await mysql.createConnection(config);
}

module.exports = getDbConnection
//module.exports = connection;










