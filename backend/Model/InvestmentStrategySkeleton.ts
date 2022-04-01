
import { validationResult } from "express-validator";
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

const DbManager = require('./DbManager');
import DbManager_ from './DbManager';

/**
 * This class is used for holding the skeleton of strategies inside its objects.
 * 
 * A strategy skeleton is the term we have used for denoting only the structural information of a strategy, not its values.
 * For e.g. - A married put strategy refers to buying a stock and simultaneously buying a put option for that stock.
 * So, skeleton of married put will only have the following info-
 * 1. Strategy Name, Description 
 * 2. One Option instrument, type = put, side = buy
 * 3. One stock instrument, side = buy
 *
 * While a strategy implementation has complete information - strategy skeleton + values (ticker, expiry date, quantity, strike price or price of instrument etc)
 * 
 * This class has mainly been used to model the strategy skeleton information into an object while adding it or fetching it to/from database.
 */

export default class InvestmentStrategySkeleton{
    id : number;
    strategyName : string;
    userId : number;
    description : string;

    constructor(id:number, strategyName:string, userId:number, description:string){
       
       this.id = id;
       this.strategyName = strategyName;
       this.userId = userId;
       this.description = description;
    }

    
    /*
    Getter for strategy skeleton id
    Parameters - None
    Return Value - Id (integer)
    */
    getId() : number {
        return this.id;
    }

    /*
    Fetches current record count in investment strategy skeleton table and sets id of current record to current record count plus one.
    Parameters - None
    Return Value - None
    */
    async setId(){

        try{
            var dbManager_ = await new DbManager();
            var response = await dbManager_.GetCountOfRecordsInDb('InvestmentStrategySkeleton');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
    }

    /** 
   * Inserts the investment strategy skeleton object in investment strategy skeleton table.
   * Parameters - None
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(){
        
        //sets id before insertion
        if(this.id == -1){
            await this.setId();
        }
        
        var sql = "INSERT INTO InvestmentStrategySkeleton (Id, StrategyName , Description, UserId) VALUES (?,?,?,?)";

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id ,this.strategyName, this.description, this.userId]); 
            connection.end()
            return response;

        }catch(err){
            console.log(err);
            return err;
        }
    }
}

module.exports = InvestmentStrategySkeleton;