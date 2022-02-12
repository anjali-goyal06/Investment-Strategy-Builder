//var config = require('./dbconnect.js');
var connection= require('./dbconnect.js');
const mysql = require('mysql')


// created database
connection.query("create database if not exists sample",(err,res)=>{
    if(err){
      console.log(err);
    }else{
      console.log(res);
    }
  })
  

connection.query("use sample" , (err,res)=>{
    if(err){
      console.log(err);
    }else{
      console.log(res);
    }
  });