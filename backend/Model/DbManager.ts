var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

export default class DbManager{

    constructor(){

    }

  
  /**
   * Purpose - To fetch the record of given user from user table in database
   * @param id - User Id (Integer)
   * @returns - Sql Record corresponding to given user id in form of json object
   */
    async GetUserDetailsFromUserId(id){

        var sql = "Select  * from  User where Id = " + mysql.escape(id);

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

    

  /**
   * Purpose - To fetch the instrument skeleton records of a particular strategy skeleton from database.
   * @param id - strategy skeleton id
   * @returns an array of all the instrument skeleton records 
   */
    async GetInstrumentsFromStrategySkeletonId(id){
        var response = [];

        //fetch the instrument skeleton records from all the skeleton tables
        var sqlOptions = "select * from OptionSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);
        var sqlFutures = "select * from FutureSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);
        var sqlStocks = "select * from StockSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);

        var arr;
        const connection = await getDbConnection()
        
        //Combine the results from the tables into an array
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


    /**
     * Purpose - Fetches the instrument record from its instrument skeleton id and strategy id to which it belongs
     * @param segment - name of the instrument is given to fetch record from appropriate table
     * @param InstrumentId 
     * @param StrategyId 
     * @returns corresponding instrument record as response
     */
    async getUserInputFromStrategySkeletonIdAndStrategyId(segment,InstrumentId,StrategyId){
        
        //fetches instrument record from appropriate table
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


    /**
     * Purpose - Fetches the strategy skeletons saved by a particular user from database
     * @param id - user id
     * @returns strategy skeleton records as response
     */
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

    /**
     * Purpose - Fetch the strategy skeleton record for the specified skeleton id
     * @param id - Strategy Skeleton Id
     * @returns - Strategy skeleton record as response
     */
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

    /**
     * Purpose - Fetches the strategy record for the specified strategy id
     * @param id - Strategy Id
     * @returns strategy record as response
     */
    async fetchStrategyFromStrategyId(strategyId){
        console.log(strategyId);
        var sql = "select * from InvestmentStrategy where InvestmentStrategy.Id =  " + mysql.escape(strategyId);
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
    
    /**
     * Purpose - Fetches all the strategies (with values) saved by a given user from database
     * @param id  user id
     * @returns strategy records as response
     */
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

    /**
     * Purpose - To get the count of records in a particular table in database
     * @param tableName 
     * @returns sql query response in json format which has a count field
     */
    async GetCountOfRecordsInDb(tableName){
        
        var sql = "Select  count(*) as count from " + tableName;

        const connection = await getDbConnection();
        var response = await connection.query(sql) ; 
        connection.end()
        //let result = JSON.parse(JSON.stringify(response));

        return response;
    }
    
}


    //var DbManager_ = new DbManager();
    //var response = DbManager_.GetUserDetailsFromUserId(1);
    //console.log(response);



module.exports = DbManager;