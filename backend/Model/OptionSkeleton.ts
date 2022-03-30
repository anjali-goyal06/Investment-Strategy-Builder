
const { validationResult } = require("express-validator");
var getDbConnection = require('../db/dbconnect');
//const mysql = require('mysql');

import IInstrumentSkeleton from './IInstrumentSkeleton';
import InstrumentSkeleton from './InstrumentSkeleton';

var DbManager = require('./DbManager');


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
    
    async AddDataToDb(StrategySkeletonId:number){

        if(this.id == -1){
            await this.setId();
        }
        
        //console.log(this.OptionSkeleton);
        
        var sql = "INSERT INTO OptionSkeleton (Id, Type , Side, InvestmentStrategySkeletonId) VALUES (?,?,?,?)";
        //var {Id, Type, Side, StrategySkeletonId} = {this.id, 

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