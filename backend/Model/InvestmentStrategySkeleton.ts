
import { validationResult } from "express-validator";
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

const DbManager = require('./DbManager');
import DbManager_ from './DbManager';

export default class InvestmentStrategySkeleton{
    static count : number = 0;
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
    Purpose - Getter for strategy skeleton id
    Parameters - None
    Return Value - Id (integer)
    */
    getId() : number {
        return this.id;
    }

    /*
    Purpose - Fetches current record count in investment strategy skeleton table and sets id of current record to current record count plus one.
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
   * Purpose - Inserts the investment strategy skeleton object in investment strategy skeleton table.
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