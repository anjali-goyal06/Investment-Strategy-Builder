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

// connection.query("create database if not exists sample",(err,res)=>{
//   if(err){
//     console.log(err);
//   }else{
//     console.log(res);
//   }
// })


// connection.query("use sample" , (err,res)=>{
//   if(err){
//     console.log(err);
//   }else{
//     console.log(res);
//   }
// });

// connection.query("create table if not exists user(name varchar(50),id int(10) primary key)" , (err,res)=>{
//   if(err){
//     console.log(err);
//   }else{
//     console.log(res);
//   }
// })



//   var sql = "INSERT INTO user (name, id) VALUES ?";
//   var values = [
//     ['John', 1],
//     ['Peter', 2],
//     ['Amy', 3]
//   ];


//   connection.query(sql, [values], function (err, result) {
//     if (err) console.log("duplicate rows " + err.message);
//     else{
//     console.log("Number of records inserted: " + result.affectedRows);
//     }
//   });
