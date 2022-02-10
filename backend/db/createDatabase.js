var config = require('./dbconnect.js');
var connection= config.connection

// created database
connection.query("create database if not exists sample2",(err,res)=>{
    if(err){
      console.log(err);
    }else{
      console.log(res);
    }
  })
  

connection.query("use sample2" , (err,res)=>{
    if(err){
      console.log(err);
    }else{
      console.log(res);
    }
  });