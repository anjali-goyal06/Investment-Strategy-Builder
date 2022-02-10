var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
 /// database : "airportdb",
  port : "3306" 
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("create database sample",(err,res)=>{
  if(err){
    console.log(err);
  }else{
    console.log(res);
  }
})


// const pool = mysql.createPool({
//   host: "localhost:0",
//   user: "root",
//   password: "My@29606",
//  // database : "airportdb"
// })

// pool.query(`select * from  airportdb.airline limit 10` , (err,res)=> {
//   return console.log(res);
// })