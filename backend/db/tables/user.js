var config = require('../dbconnect.js');
var connection= config.connection


connection.query("create table if not exists user(name varchar(50),id int(10) primary key)" , (err,res)=>{
    if(err){
      console.log(err);
    }else{
      console.log(res);
    }
  })