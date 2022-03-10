const { validationResult } = require("express-validator")
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');


class InvestmentStrategySkeleton{

    constructor(ele){
        this.Id = ele.Id;
        this.StrategyName = ele.StrategyName;
        this.Description = ele.Description;
        this.UserId = ele.UserId;
    }
    async AddData(){
        var sql = "INSERT INTO InvestmentStrategySkeleton (Id, StrategyName , Description, UserId) VALUES (?,?,?,?)";
        var {Id, StrategyName , Description, UserId } = this

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [Id ,StrategyName , Description, UserId ] ) ;
            connection.end() 
            return response;
        }catch(err){
                console.log(err);
                return err;
        }
    }
    async getValuesByUserId(id){
        var sql = "Select  * from  InvestmentStrategySkeleton where UserId = " + mysql.escape(this.user.email);

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            console.log(response)
            return response;
        }catch(err){
            return err;
        }
    }

    async AddHardCodeValues(){
        // {
        //     "Id" : "2" ,
        //     "StrategyName" : "Butterfly",
        //     "Description" : "ABCD",
        //     "UserId" : "1"
        // }
    }
}

module.exports =  InvestmentStrategySkeleton
