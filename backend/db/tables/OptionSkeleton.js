var connection =require('../dbconnect.js');

connection.query("create table if not exists " , (err,res)=>{
    if(err){
      console.log(err);
    }else{
      console.log(res);
    }
})