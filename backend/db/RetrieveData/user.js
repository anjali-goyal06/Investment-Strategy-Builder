var config = require('../dbconnect.js');
var connection= config.connection


var sql = "Select * from sample2.user;";


connection.query(sql,  (err, result)=> {
  if (err) console.log("duplicate rows " + err.message);
  else{
    console.log(result);
  }
});