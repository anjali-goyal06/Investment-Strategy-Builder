var connection =require('../dbconnect.js');

connection.query("create table if not exists user(name varchar(50),id int(10) primary key, email varchar(50),password varchar(1000))" , (err,res)=>{
    if(err){
      console.log(err);
    }else{
      console.log(res);
    }
})