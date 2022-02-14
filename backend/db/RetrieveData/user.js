var connection= require('../dbconnect.js');

var sql = "Select * from sample.user;";

connection.query(sql,  (err, result)=> {
  if (err) console.log("duplicate rows " + err.message);
  else{
    console.log(result);
  }
});