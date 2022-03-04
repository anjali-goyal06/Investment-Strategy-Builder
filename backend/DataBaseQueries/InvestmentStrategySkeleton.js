const { validationResult } = require("express-validator")
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');


class InvestmentStrategySkeleton{

    AddData(){
        var sql = "INSERT INTO InvestmentStrategySkeleton (Id, StrategyName , Description, UserId) VALUES (?,?,?,?)";
        var {Id, StrategyName , Description, UserId } = this.OptionSkeleton

        try{
            var response = await connection.query(sql, [Id ,StrategyName , Description, UserId ] ) ; 
            return response;
            }catch(err){
                console.log(err);
                return err;
            }
    }
    getValuesByUserId(id){
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
}

module.exports =  InvestmentStrategySkeleton
