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

    async GetInstrumentsFromStrategySkeletonId(id){
        var response;
        var sqlOptions = "select * from OptionSkeleton where InvestmentStrategySkeletonId = id";
        var sqlFutures = "select * from FutureSkeleton where InvestmentStrategySkeletonId = id";
        var sqlStocks = "select * from StockSkeleton where InvestmentStrategySkeletonId = id";

        var arr;
        const connection = await getDbConnection()
        
        arr = await connection.query(sqlOptions) ; 
        for(let i in arr){
             arr[i].segment = "option";
             response.push(arr[i]);
        }

        arr = await connection.query(sqlFutures) ; 
        for(let i in arr){
            arr[i].segment = " future";
            response.push(arr[i]);
        }

        arr = await connection.query(sqlStocks) ; 
        for(let i in arr){
            arr[i].segment = "stock"
            response.push(arr[i]);
        }

        connection.end()
        return response;


    }

    async getUserInputFromStrategySkeletonIdAndStrategyId(segment,InstrumentId,StrategyId){
        
        if(segment=="option"){
            var sql = "select * from Options where OptionSkeletonId=" + mysql.escape(InstrumentId) + "AND InvestmentStrategyId=" + mysql.escape(StrategyId);
        }else if(segment=="future"){
            var sql = "select * from Future where FutureSkeletonId=" + mysql.escape(InstrumentId) + "AND InvestmentStrategyId=" + mysql.escape(StrategyId);
        }else{
            var sql = "select * from Stock where StockSkeletonId=" + mysql.escape(InstrumentId) + "AND InvestmentStrategyId=" + mysql.escape(StrategyId);
        }
         

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

        var sql = "select InvestmentStrategy.Id as StrategyId, Name, InvestmentStrategySkeletonId as StrategySkeletonId from InvestmentStrategy where InvestmentStrategy.UserId =  " + mysql.escape(id);

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            return response;
        }catch(err){
            return err;
        }
        
    }

    // async GetSavedStrategiesFromUserId(id){

    //     var sql = "select InvestmentStrategy.Id as StrategyId, Name, InvestmentStrategySkeletonId as StrategySkeletonId, StrategyName as Strategy from InvestmentStrategy, InvestmentStrategySkeleton where (InvestmentStrategy.InvestmentStrategySkeletonId = InvestmentStrategySkeleton.Id) AND (InvestmentStrategy.UserId =  " + mysql.escape(id) + ")";

    //     try{
    //         const connection = await getDbConnection()
    //         var response = await connection.query(sql) ; 
    //         connection.end()
    //         return response;
    //     }catch(err){
    //         return err;
    //     }
        
    // }

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