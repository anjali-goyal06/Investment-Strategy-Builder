var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

class FutureSkeleton{

    //constructor(OptionSkeleton){
      //  this.OptionSkeleton = OptionSkeleton
    //}

    async AddData(){
        
        console.log(this.FutureSkeleton);
        
        var sql = "INSERT INTO FutureSkeleton (Id, Side, StrategySkeletonId) VALUES (?,?,?)";
        var {Id, Side, StrategySkeletonId} = this.FutureSkeleton

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [Id , Side, StrategySkeletonId] ) ; 
            connection.end()

            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
   

    getValuesByStrategyId(id){
            var sql = "Select  * from  FutureSkeleton where StrategySkeletonId = " + mysql.escape(id);

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

module.exports = FutureSkeleton