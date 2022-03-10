const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');

const InvestmentStrategySkeleton = require('../DataBaseQueries/InvestmentStrategySkeleton')

router.get('/' , async (req,res)=>{
    console.log("sample check")
    try{
            var sql = "Select  * from  InvestmentStrategySkeleton";
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; //,  function (err, result) {
            connection.end()
            return res.send(response);
    }catch(err){
        return res.send(err);
    }
    
})

router.post('/addStrategy' , async (req,res)=>{
    console.log("sample post addstrategy")
    try{
        var sk = new InvestmentStrategySkeleton(req.body);
        var response = sk.AddData();
        console.log("**********")
        console.log(response);
        res.send(response);
      //  res.send("done")
    }catch(err){
        return res.send(err);
    }
    
})

router.get('/:id' ,async (req,res)=>{
     try{
            var sql = "Select  * from  InvestmentStrategySkeleton where Id = " + mysql.escape(req.params.id);
            const connection = await getDbConnection()
           // var response = await connection.query(sql, [id , name , email , secPass] ) ; //,  function (err, result) {
            connection.end()
            return res.send(response);
    }catch(err){
        return res.send(err);
    }
})


module.exports = router