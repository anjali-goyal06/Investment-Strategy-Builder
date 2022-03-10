
import { validationResult } from "express-validator";
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');


class InvestmentStrategySkeleton{
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

        //var Db = new DbManager();
       // var result = Db.GetCountOfRecordsInDb("user");
       var sql = "Select  count(*) as count from InvestmentStrategySkeleton";

       const connection = await getDbConnection();
       var response = await connection.query(sql) ; 
       connection.end()
        
        this.id = response[0].count + 1;
        console.log(this.id);

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
