const { sanitize } = require('express-validator');
var mysql = require('promise-mysql');


var config = {
  host: "localhost",
  user: "root",
  password: "password",
  port : "3306",
  database : "investmentstrategybuilder"
}
/*

var config = {
  host: "database-1.ctvblfobct2i.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "strategy",
  port : "3306",
  database : "InvestmentStrategyBuilder"
}
*/
const getDbConnection = async () => {
  return await mysql.createConnection(config);
}

module.exports = getDbConnection
//module.exports = connection;










