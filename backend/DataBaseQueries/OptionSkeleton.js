var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

class OptionSkeleton{

    //constructor(OptionSkeleton){
      //  this.OptionSkeleton = OptionSkeleton
    //}

    async AddData(){
        
        console.log(this.FutureSkeleton);
        // id : table table cnt and add one 
        var sql = "INSERT INTO OptionSkeleton (Id, Type , Side, StrategySkeletonId) VALUES (?,?,?,?)";
        var {Id, Type, Side, StrategySkeletonId} = this.OptionSkeleton

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [Id ,Type, Side, StrategySkeletonId] ) ; 
            connection.end()

            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
   

    getValuesByStrategyId(id){
            var sql = "Select  * from  OptionSkeleton where StrategySkeletonId = " + mysql.escape(id);
            try{
                const connection = await getDbConnection()
                var response = await connection.query(sql ) ; 
                connection.end()
                return response;
            }catch(err){
                console.log(err);
                return err;
            }
    }    

}

module.exports = OptionSkeleton