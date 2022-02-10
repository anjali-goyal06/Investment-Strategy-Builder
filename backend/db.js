var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port : "3306" 
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

connection.query("create database sample",(err,res)=>{
  if(err){
    console.log(err);
  }else{
    console.log(res);
  }
})

