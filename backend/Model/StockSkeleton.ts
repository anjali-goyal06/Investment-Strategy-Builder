
var getDbConnection = require('../db/dbconnect');
import InstrumentSkeleton from './InstrumentSkeleton';
const DbManager = require('./DbManager');
import DbManager_ from './DbManager';
export default class StockSkeleton extends InstrumentSkeleton{

    constructor(id:number, side:string){
        super();
        this.id = id;
        this.side = side;
    }

    getId() : number {
        return this.id;
    }

   /**
    * Purpose - Fetches current record count in stock skeleton table and sets id of current record to current record count plus one.
    * Parameters - None
    * Return Value - None
    */
    async setId(){
        try{
            var dbManager_ = await new DbManager();
            var response = await dbManager_.GetCountOfRecordsInDb('StockSkeleton');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
    }

  /**
   *  Purpose - Inserts the stock skeleton object in stock skeleton table.
   * @param StrategySkeletonId - Id of the strategy skeleton (integer) to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(StrategySkeletonId:number){

        //sets the id before inserting in database
        if(this.id == -1){
            await this.setId();
        }
    
        
        var sql = "INSERT INTO StockSkeleton (Id, Side, InvestmentStrategySkeletonId) VALUES (?,?,?)";
        //var {Id, Type, Side, StrategySkeletonId} = {this.id, 

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id, this.side, StrategySkeletonId]) ; 
            connection.end()

            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
}

module.exports = StockSkeleton;