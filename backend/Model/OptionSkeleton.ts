
const { validationResult } = require("express-validator");
var getDbConnection = require('../db/dbconnect');
import InstrumentSkeleton from './InstrumentSkeleton';

const DbManager = require('./DbManager');
import DbManager_ from './DbManager';

/**
 * A Option Skeleton only contains the structural information of a option instrument without its specifying values (strike price, ticker, quantity, premium etc).
 * For e.g. A option contract consists of premium of contract, quantity, side, ticker, expiry date etc.
 * But Option Skeleton only holds its side and type information i.e. -
 * Option Skeleton = (type -> put or call) and (side -> buy or sell)
 * 
 * This class holds option skeleton information in its objects.
 */

export default class OptionSkeleton extends InstrumentSkeleton{
   
    type : string;

    constructor(id:number, side:string, type:string){
        super();
        this.id = id;
        this.side = side;
        this.type = type;
    }
    
    /**
     * Getter for option skeleton id
     * @returns Id of option skeleton (integer)
     */
    getId() : number {
        return this.id;
    }

    /*
    Fetches current record count in option skeleton table and sets id of current record to current record count plus one.
    Parameters - None
    Return Value - None
    */
    async setId(){

        try{
            var dbManager_ = await new DbManager();
            var response = await dbManager_.GetCountOfRecordsInDb('OptionSkeleton');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
       
    }
    
  
  /**
   * Inserts the option skeleton object in option skeleton table.
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