var getDbConnection = require('../db/dbconnect');
const DbManager = require('./DbManager');
import DbManager_ from './DbManager';
import InstrumentSkeleton from './InstrumentSkeleton';

/**
 * A Future Skeleton only contains the structural information of a future instrument without specifying values (price, ticker, quantity etc).
 * For e.g. A future contract consists of price of contract, quantity, side, ticker, expiry date etc.
 * But Future Skeleton only holds its side information i.e. whether it is a buy or sell contract.
 * 
 * This class holds future skeleton information in its objects.
 */
export default class FutureSkeleton extends InstrumentSkeleton{

    constructor(id:number, side:string){
        super();
        this.id = id;
        this.side = side;
    }

    /**
     * Getter for future skeleton id
     * @returns id (integer)
     */
    getId() : number {
        return this.id;
    } 
    
    /*
    Fetches current record count in future skeleton table and sets id of current record to current record count plus one.
    Parameters - None
    Return Value - None
    */
    async setId(){
            
        try{
            var dbManager_ = await new DbManager();
            var response = await dbManager_.GetCountOfRecordsInDb('FutureSkeleton');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
    
    }

  /**
   * Inserts the future skeleton object in future skeleton table.
   * @param StrategySkeletonId - Id of the strategy skeleton (integer) to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(StrategySkeletonId:number){


        //sets id before inserting in db
        if(this.id == -1){
            await this.setId();
        }
                
        var sql = "INSERT INTO FutureSkeleton (Id, Side, InvestmentStrategySkeletonId) VALUES (?,?,?)";

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

module.exports = FutureSkeleton;