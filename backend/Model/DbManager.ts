var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

export default class DbManager{

   
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
        var response = [];
        console.log("dshjxkm")
        var sqlOptions = "select * from OptionSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);
        var sqlFutures = "select * from FutureSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);
        var sqlStocks = "select * from StockSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);

        var arr;
        const connection = await getDbConnection()
        
        arr = await connection.query(sqlOptions) ; 
        console.log(sqlOptions);
        console.log(arr);
        for(let i in arr){
             arr[i].segment = "option";
             response.push(arr[i]);             
        }

        arr = await connection.query(sqlFutures) ; 
        for(let i in arr){
            arr[i].segment = "future";
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
            var sql = "select * from Options where OptionSkeletonId=" + mysql.escape(InstrumentId) + " AND InvestmentStrategyId=" + mysql.escape(StrategyId);
        }else if(segment=="future"){
            var sql = "select * from Future where FutureSkeletonId=" + mysql.escape(InstrumentId) + " AND InvestmentStrategyId=" + mysql.escape(StrategyId);
        }else{
            var sql = "select * from Stock where StockSkeletonId=" + mysql.escape(InstrumentId) + " AND InvestmentStrategyId=" + mysql.escape(StrategyId);
        }
         
        console.log(sql);
        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            console.log(response)
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

    async GetStrategySkeletonsFromSkeletonId(id){

        var sql = "select Id, StrategyName,Description from InvestmentStrategySkeleton where Id = " + mysql.escape(id);
        console.log(sql);
        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql) ; 
            connection.end()
            
            console.log(response);
            return response;
        }catch(err){
            return err;
        }
        
    }

    async fetchStrategyFromStrategyId(strategyId){
        var sql = "select Id, Name,StockName,Ticker,ExpiryDate,userId,Description, InvestmentStrategySkeletonId from InvestmentStrategy where InvestmentStrategy.Id =  " + mysql.escape(strategyId);
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

        var sql = "select Id, Name,StockName,Ticker,ExpiryDate,userId,Description, InvestmentStrategySkeletonId from InvestmentStrategy where InvestmentStrategy.userId =  " + mysql.escape(id);

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