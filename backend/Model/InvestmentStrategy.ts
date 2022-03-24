var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
var StrategyPlot_ = require('./StrategyPlot');
import IInstrument from './IInstrument';
const Future =  require('./Future');
const Stock  = require('./Stock');
const Options = require('./Options');
const OptionSkeleton = require('./OptionSkeleton');
const FutureSkeleton = require('./FutureSkeleton');
const StockSkeleton = require('./StockSkeleton');
//import DbManager from './DbManager'
const DbManager = require('./DbManager');

interface IInstrumentStrategy{
    id : number;
    stockName : string;
    ticker : string;
    userId : number;
    expiryDate : Date;
    name:string;
    strategySkeletonId:number;
    description : string;
}

export default class InvestmentStrategy implements IInstrumentStrategy{

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
    xStart : number;

    constructor(id:number, stockName:string, ticker:string, userId:number, expiryDate:Date, name:string, strategySkeletonId:number, description:string){
        this.id = id;
        this.stockName = stockName;
        this.ticker = ticker;
        this.userId = userId;
        this.expiryDate = expiryDate;
        this.name = name;
        this.strategySkeletonId = strategySkeletonId;
        this.description = description;
        this.instruments = [];
        console.log(this.instruments)
        this.plot = new StrategyPlot_();
        this.plot.xCoords = [];
        this.plot.yCoords = [];

        this.xStart = (870);
    }
  

    setValues(obj: IInstrumentStrategy){
        this.id = obj?.id ?? -1;
        this.stockName = obj?.stockName ?? "";
        this.ticker  = obj?.ticker ?? "";
        this.userId  = obj?.userId ?? -1;
        this.expiryDate =  obj?.expiryDate? new Date(obj.expiryDate) : new Date("2022-03-31");
        this.name = obj?.name ?? "";
        this.strategySkeletonId = obj?.strategySkeletonId ?? -1;
        this.description =  obj?.description ?? ""; 
    }

    printValues(){
        console.log(this.id);
        console.log(this.stockName);
        console.log(this.ticker);
        console.log(this.userId);
        console.log(this.expiryDate);
        console.log(this.name);
        console.log(this.strategySkeletonId);
        console.log(this.description);
    }

    getPlot() : StrategyPlot{
        return this.plot;
    }

    combinedPlot(){
       // let i : keyof IInstrument
       var flag = true;
        for(let k in this.instruments){
            
            console.log(this.instruments[k]);
            let tempPlot= this.instruments[k].makePlot(this.xStart);
           
            console.log(tempPlot);
          
            
            if(flag){
                for(let i in tempPlot.xCoords){
                    this.plot.yCoords.push(0)
                    this.plot.xCoords.push(0)
                }
            }
           
           
            for(let i in tempPlot.xCoords){
                this.plot.xCoords[i] = tempPlot.xCoords[i]
                this.plot.yCoords[i] += tempPlot.yCoords[i];
            }
            flag = false;
        }
        return this.plot;
    }

    
    getId() : number {
        return this.id;
    }

    async setId(){

        try{
            var sql = "Select  count(*) as count from InvestmentStrategy";

            const connection = await getDbConnection();
            var response = await connection.query(sql) ; 
            connection.end()
            
            this.id = response[0].count + 1;
            console.log(this.id);
        }catch(err){
           console.log(err)
           return err
        }

    }

  
    async AddDataToDb(){
        
        if(this.id == -1){
            await this.setId();
        }
        
        var sql = "INSERT INTO InvestmentStrategy (Id, Name , StockName, Ticker, ExpiryDate, UserId, Description, InvestmentStrategySkeletonId) VALUES (?,?,?,?,?,?,?,?)";
       
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

    async fetchAllStrategyImplementationFromDBForUser(userId){
        var db = await new DbManager();
        var arrStrategy =  await db.GetSavedStrategiesFromUserId(userId);

        console.log("arrastrateg")
        console.log(arrStrategy);
       
        return arrStrategy;
    }

    async fetchDetailedStrategySkeletonFromDbForUser(strategySkeletonId){
        var db = await new DbManager();
        var skeleton = await db.GetStrategySkeletonsFromSkeletonId(strategySkeletonId)
        var listInstrumentSkeleton = await db.GetInstrumentsFromStrategySkeletonId(strategySkeletonId);
        var response = skeleton[0];
        console.log(listInstrumentSkeleton);
        console.log(response);
        response.listInstrumentSkeleton = listInstrumentSkeleton;
        return response;
    }

    async fetchDetailedStrategyImplementationFromDbForUser(strategyId){

        try{
            var db = await new DbManager();
            var strategy = await db.fetchStrategyFromStrategyId(strategyId);
            console.log(strategy);
        
            var listInstrumentSkeleton = await db.GetInstrumentsFromStrategySkeletonId(strategy[0].InvestmentStrategySkeletonId);
            console.log(listInstrumentSkeleton);
            var listInstrument = [];
            for(let j in listInstrumentSkeleton){
                var input = await db.getUserInputFromStrategySkeletonIdAndStrategyId(listInstrumentSkeleton[j].segment,listInstrumentSkeleton[j].Id,strategyId)
                console.log(input[0]);
                console.log(listInstrumentSkeleton[j])
                listInstrument.push(this.AddSkeleton(input[0],listInstrumentSkeleton[j]));
            }
            console.log("list of instruments : ")
            console.log(listInstrument);
            var result = strategy[0];
            result.listInstruments = listInstrument;
            console.log(result);
            return result;
        }catch(err){
            console.log(err)
            return err;
        }
    }
    
    AddSkeleton(x,y){
        let a = x;
        console.log("input 0")
        console.log(x);
        
        a.StrikePrice = x.StrikePrice;
        a.Premium = x.Premium;
        a.Price = x.Price;
        a.Side = y.Side;
        a.Type = y.Type;
        a.InstrumentSkeletonId = y.Id;
        a.segment = y.segment;

        if(x.OptionSkeletonId) a.SkeletonId = x.OptionSkeletonId;
        else if(x.FutureSkeletonId) a.SkeletonId = x.FutureSkeletonId;
        else a.SkeletonId = x.StockSkeletonId;
        return a;
    }

    async fetchStrategyWithValuesFromDb(userId){

        var db = await new DbManager();
        var arrStrategy =  await db.GetSavedStrategiesFromUserId(userId);
        console.log("arrastrateg")
        console.log(arrStrategy);
        return arrStrategy;
    }

}

module.exports = InvestmentStrategy;






/*  constructor();
    constructor(obj: IInstrumentStrategy);
    constructor(obj? : IInstrumentStrategy){
        console.log("inside class strategy")
        this.id = obj?.id ?? -1;
        this.stockName = obj?.stockName ?? "";
        this.ticker  = obj?.ticker ?? "";
        this.userId  = obj?.userId ?? -1;
        this.expiryDate =  obj?.expiryDate? new Date(obj.expiryDate) : new Date("2022-03-31");
        this.name = obj?.name ?? "";
        this.strategySkeletonId = obj?.strategySkeletonId ?? -1;
        this.description =  obj?.description ?? ""; 
        console.log("cons value = ");
        console.log(this)
    }
    */