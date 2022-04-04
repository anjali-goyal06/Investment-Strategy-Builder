
var getDbConnection = require('../db/dbconnect');
import InstrumentSkeleton from './InstrumentSkeleton';
const DbManager = require('./DbManager');
import DbManager_ from './DbManager';

/**
 * A Stock Skeleton only contains the structural information of a stock instrument without specifying values (price, ticker, quantity etc).
 * For e.g. A stock has information about its price, quantity, side, ticker, expiry date etc.
 * But Stock Skeleton only holds its side information i.e. whether stock is bought or sold.
 * 
 * This class holds stock skeleton information in its objects.
 */
export default class StockSkeleton extends InstrumentSkeleton{

    constructor(id:number, side:string){
        super();
        this.id = id;
        this.side = side;
    }

    /**
     * Getter for stock skeleton id
     * @returns Id of stock skeleton (integer)
     */
    getId() : number {
        return this.id;
    }


  /**
   * Inserts the stock skeleton object in stock skeleton table.
   * @param StrategySkeletonId - Id of the strategy skeleton (integer) to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(StrategySkeletonId:number){

    
        
        var sql = "INSERT INTO StockSkeleton (Side, InvestmentStrategySkeletonId) VALUES (?,?)";

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.side, StrategySkeletonId]);
            this.id = response.insertId; 
            connection.end()

            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
}

module.exports = StockSkeleton;