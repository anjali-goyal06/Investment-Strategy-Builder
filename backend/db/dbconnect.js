var mysql = require('mysql');

var config = {
  host: "localhost",
  user: "root",
  password: "password",
  port : "3306" 
}

var connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports ={
  connection : mysql.createConnection(config) 
} 










