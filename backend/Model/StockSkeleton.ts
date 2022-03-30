
var getDbConnection = require('../db/dbconnect');

import IInstrumentSkeleton from './IInstrumentSkeleton';
import InstrumentSkeleton from './InstrumentSkeleton';
var DbManager = require('./DbManager');
export default class StockSkeleton extends InstrumentSkeleton{

    //id: number;
    //side: string;
    investmentStrategySkeletonId: number;

    constructor(id:number, side:string, skeletonId:number){
        super();
        this.id = id;
        this.side = side;
        this.investmentStrategySkeletonId = skeletonId;
    }

    getId() : number {
        return this.id;
    }

    async setId(){
        try{
            const DbManager_ = await new DbManager();
            var response = await DbManager_.GetCountOfRecordsInDb('StockSkeleton');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
    }
    
    async AddDataToDb(StrategySkeletonId:number){

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