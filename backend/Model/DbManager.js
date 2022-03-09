var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

class DbManager{

    constructor(){

    }

    async GetUserDetailsFromUserId(id){

        var sql = "Select  * from  User where Id = " + mysql.escape(id);

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            return response;
        }catch(err){
            return err;
        }
        
    }

    async GetStrategySkeletonsFromUserId(id){

        var sql = "select Id, StrategyName from InvestmentStrategySkeleton where UserId = " + mysql.escape(id);

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            return response;
        }catch(err){
            return err;
        }
        
    }

    async GetSavedStrategiesFromUserId(id){

        var sql = "select InvestmentStrategy.Id as StrategyId, Name, InvestmentStrategySkeletonId as StrategySkeletonId, StrategyName as Strategy from InvestmentStrategy, InvestmentStrategySkeleton where (InvestmentStrategy.InvestmentStrategySkeletonId = InvestmentStrategySkeleton.Id) AND (InvestmentStrategy.UserId =  " + mysql.escape(id) + ")";

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            return response;
        }catch(err){
            return err;
        }
        
    }

    async GetCountOfRecordsInDb(tableName){
        
        var sql = "Select  count(*) as count from " +  mysql.escape(tableName);

        const connection = await getDbConnection();
        var response = await connection.query(sql) ; 
        connection.end()
        //let result = JSON.parse(JSON.stringify(response));

        return response;
    }

    async GetStrategySkeletonFromStrategyName(name){

        var OptionSql = "select * from OptionSkeleton where InvestmentStrategySkeletonId = (select Id from InvestmentStrategySkeleton where StrategyName = " + mysql.escape(name) + ")";
        var FutureSql = "select * from FutureSkeleton where InvestmentStrategySkeletonId = (select Id from InvestmentStrategySkeleton where StrategyName = " + mysql.escape(name) + ")";
        var StockSql = "select * from StockSkeleton where InvestmentStrategySkeletonId = (select Id from InvestmentStrategySkeleton where StrategyName = " + mysql.escape(name) + ")";

        try{
            const connection = await getDbConnection()
            var OptionResponse = await connection.query(OptionSql);
            var StockResponse = await connection.query(StockSql);
            var FutureResponse = await connection.query(FutureSql);   
            connection.end()
            var response = OptionResponse + StockResponse + FutureResponse;
            
            return response;

        }catch(err){
            return err;
        }
        
    }  
}


module.exports = DbManager;