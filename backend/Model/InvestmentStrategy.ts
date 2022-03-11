import { StrategyPlot } from "./StrategyPlot";
import { IInstrument } from "./IInstrument";
var getDbConnection = require('../db/dbconnect');

class InvestmentStrategy{
    static count : number = 0;
    id : number;
    stockName : string;
    ticker : string;
    currentStockPrice : Float32Array;
    userId : number;
    expiryDate : Date;
    plot : StrategyPlot;
    name:string;
    strategySkeletonId:number;
    description : string;
    instruments : IInstrument[];

    constructor(id:number, stockName:string, ticker:string, userId:number, expiryDate:Date, name:string, strategySkeletonId:number, description:string){
        this.id = id;
        this.stockName = stockName;
        this.ticker = ticker;
        this.userId = userId;
        this.expiryDate = expiryDate;
        this.name = name;
        this.strategySkeletonId = strategySkeletonId;
        this.description = description;
    }

    combinedPlot(){
        var tempPlot; 
        for(var i in this.instruments){
        //    tempPlot  = i.getPlot();
        }
    }

    getStrategySkeleton(){

    }

    getId() : number {
        return this.id;
    }

    async setId(){

        //var Db = new DbManager();
       // var result = Db.GetCountOfRecordsInDb("user");
       var sql = "Select  count(*) as count from InvestmentStrategy";

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
        
        var sql = "INSERT INTO InvestmentStrategy (Id, Name , StockName, Ticker, ExpiryDate, UserId, Description, InvestmentStrategySkeletonId) VALUES (?,?,?,?,?,?,?,?)";
        //var {Id, Type, Side, StrategySkeletonId} = {this.id, 

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id ,this.name, this.stockName, this.ticker, this.expiryDate, this.userId, this.description, this.strategySkeletonId]); 
            connection.end()
            return response;

        }catch(err){
            console.log(err);
            return err;
        }
    }

}
