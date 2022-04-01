
const { validationResult } = require("express-validator");
var getDbConnection = require('../db/dbconnect');
import InstrumentSkeleton from './InstrumentSkeleton';

//var DbManager = require('./DbManager');
import DbManager from './DbManager';


export default class OptionSkeleton extends InstrumentSkeleton{
   
    //id: number;
    //side: string;
    type : string;
    investmentStrategySkeletonId: number;

    constructor(id:number, side:string, type:string, skeletonId:number){
        super();
        this.id = id;
        this.side = side;
        this.type = type;
        this.investmentStrategySkeletonId = skeletonId;
    }
    
    getId() : number {
        return this.id;
    }

    /*
    Purpose - Fetches current record count in option skeleton table and sets id of current record to current record count plus one.
    Parameters - None
    Return Value - None
    */
    async setId(){

        try{
            const DbManager_ = await new DbManager();
            var response = await DbManager_.GetCountOfRecordsInDb('OptionSkeleton');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
       
    }
    
  
  /**
   *  Purpose - Inserts the option skeleton object in option skeleton table.
   * @param StrategySkeletonId - Id of the strategy skeleton (integer) to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(StrategySkeletonId:number){

        //sets id before inserting in db
        if(this.id == -1){
            await this.setId();
        }
         
        var sql = "INSERT INTO OptionSkeleton (Id, Type , Side, InvestmentStrategySkeletonId) VALUES (?,?,?,?)";
       
        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id ,this.type, this.side, StrategySkeletonId]); 
            connection.end()

            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
   
}

module.exports = OptionSkeleton