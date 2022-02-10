var config = require('../dbconnect.js');
var connection= config.connection


var sql = "INSERT INTO user (name, id) VALUES ?";
var values = [
  ['ABC', 1],
  ['XYZ', 2],
  ['Harry', 3]
];


connection.query(sql, [values], function (err, result) {
  if (err) console.log("duplicate rows " + err.message);
  else{
    console.log("Number of records inserted: " + result.affectedRows);
  }
});