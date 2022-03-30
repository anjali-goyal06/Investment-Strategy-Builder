
import { validationResult } from "express-validator";
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

var DbManager = require('./DbManager');

export default class InvestmentStrategySkeleton{
    static count : number = 0;
    id : number;
    strategyName : string;
    userId : number;
    description : string;
    //instrumentSkeletons : IInstrumentSkeleton[];

    constructor(id:number, strategyName:string, userId:number, description:string){
       
       this.id = id;
       this.strategyName = strategyName;
       this.userId = userId;
       this.description = description;
    }

    getId() : number {
        return this.id;
    }

    async setId(){

        try{
            const DbManager_ = await new DbManager();
            var response = await DbManager_.GetCountOfRecordsInDb('InvestmentStrategySkeleton');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
    }

    async AddDataToDb(){
        
        //console.log(this.OptionSkeleton);
        if(this.id == -1){
            await this.setId();
        }
        
        var sql = "INSERT INTO InvestmentStrategySkeleton (Id, StrategyName , Description, UserId) VALUES (?,?,?,?)";
        //var {Id, Type, Side, StrategySkeletonId} = {this.id, 

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
