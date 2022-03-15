
const { validationResult } = require("express-validator");
var getDbConnection = require('../db/dbconnect');
//const mysql = require('mysql');

import IInstrumentSkeleton from './IInstrumentSkeleton';


class OptionSkeleton implements IInstrumentSkeleton{
   
    id: number;
    side: string;
    type : string;
    investmentStrategySkeletonId: number;

    constructor(id:number, side:string, type:string, skeletonId:number){
        
        this.id = id;
        this.side = side;
        this.type = type;
        this.investmentStrategySkeletonId = skeletonId;
    }
    
    getId() : number {
        return this.id;
    }

    async setId(){

        //var Db = new DbManager();
       // var result = Db.GetCountOfRecordsInDb("user");
       var sql = "Select  count(*) as count from OptionSkeleton";

       const connection = await getDbConnection();
       var response = await connection.query(sql) ; 
       connection.end()
        
        this.id = response[0].count + 1;
        console.log(this.id);

    }
    
    async AddDataToDb(){

        if(this.id == -1){
            await this.setId();
        }
        
        //console.log(this.OptionSkeleton);
        
        var sql = "INSERT INTO OptionSkeleton (Id, Type , Side, InvestmentStrategySkeletonId) VALUES (?,?,?,?)";
        //var {Id, Type, Side, StrategySkeletonId} = {this.id, 

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id ,this.type, this.side, this.investmentStrategySkeletonId]) ; 
            connection.end()

            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
   
}