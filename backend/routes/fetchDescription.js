const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');

const InvestmentStrategySkeleton = require('../DataBaseQueries/InvestmentStrategySkeleton')

router.get('/' , async (req,res)=>{

    // get all the strategySkeleton for the user (popular + custom made by that user  + blank)
    console.log("sample check")
    try{
        var db = new DbManager();
        var userId;
        // get userId from db

        var arrStrategySkeleton =  await db.GetStrategySkeletonsFromUserId(userId);
        return arrStrategySkeleton;
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