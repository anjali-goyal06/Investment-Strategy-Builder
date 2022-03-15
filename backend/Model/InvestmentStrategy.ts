var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
import IInstrument from './IInstrument';
import DbManager from './DbManager'

export default class InvestmentStrategy{

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
       // let i : keyof IInstrument
        for(let k in this.instruments){
            let tempPlot:StrategyPlot = this.instruments[k].getPlot();
            
           // let tempX = tempPlot.xCoords;
            let tempY = tempPlot.yCoords;

            for(let i in this.plot.xCoords){
                this.plot.yCoords[i] += tempY[i];
            }
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
    
    async fetchStrategyWithValuesFromDb(){

        var db = new DbManager();
        var userId;
        // get userId from db

        var arrStrategy =  await db.GetSavedStrategiesFromUserId;
        var response;

        for(var i in arrStrategy){
            var strategy = arrStrategy[i];

            var strategyId = strategy.InvestmentStrategySkeletonId;

            var listInstrumentSkeleton = await db.GetInstrumentsFromStrategySkeletonId(strategyId);

            for(let j in listInstrumentSkeleton){

                var input = await db.getUserInputFromStrategySkeletonIdAndStrategyId(listInstrumentSkeleton[i].segment,listInstrumentSkeleton[i].Id,listInstrumentSkeleton[i].InvestmentStrategySkeletonId)
                
                console.log("\n\n");
                console.log(strategy);
                console.log(listInstrumentSkeleton[i]);
                console.log(input)
                
            }
        }


    }

}
