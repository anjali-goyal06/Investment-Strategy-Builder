var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
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

    async fetchAllStrategyImplementationFromDBForUser(userId){
        var db = await new DbManager();
        var arrStrategy =  await db.GetSavedStrategiesFromUserId(userId);

        console.log("arrastrateg")
        console.log(arrStrategy);
       
        return arrStrategy;
    }

    

    async fetchDetailedStrategyImplementationFromDbForUser(strategyId){
        var db = await new DbManager();
        var strategy = await db.fetchStrategyFromStrategyId(strategyId);
       // var investmentStrategy = new InvestmentStrategy({id: strategy.Id, name : strategy.Name,stockName : strategy.StockName,ticker : strategy.Ticker, expiryDate : strategy.ExpiryDate, userId : strategy.userId,description : strategy.Description, strategySkeletonId : strategy.InvestmentStrategySkeletonId});
          this.setValues({id: strategy.Id, name : strategy.Name,stockName : strategy.StockName,ticker : strategy.Ticker, expiryDate : strategy.ExpiryDate, userId : strategy.userId,description : strategy.Description, strategySkeletonId : strategy.InvestmentStrategySkeletonId});

        var listInstrumentSkeleton = await db.GetInstrumentsFromStrategySkeletonId(strategy.InvestmentStrategySkeletonId);

        for(let j in listInstrumentSkeleton){
            var input = await db.getUserInputFromStrategySkeletonIdAndStrategyId(listInstrumentSkeleton[j].segment,listInstrumentSkeleton[j].Id,strategyId)
            
            // instruments = [];
            var temp = listInstrumentSkeleton[j];
              
            if(listInstrumentSkeleton[j].segment == "option"){
               
            }else if(listInstrumentSkeleton[j].segment=="future"){
               
            }else{
                
            }
        }

    }
    
    async fetchStrategyWithValuesFromDb(userId){

        var db = await new DbManager();
        var arrStrategy =  await db.GetSavedStrategiesFromUserId(userId);
        console.log("arrastrateg")
        console.log(arrStrategy);
          var response;

        for(var i in arrStrategy){
            var strategy = arrStrategy[i];
            console.log(strategy)
            var investmentStrategy = new InvestmentStrategy({id: strategy.Id, name : strategy.Name,stockName : strategy.StockName,ticker : strategy.Ticker, expiryDate : strategy.ExpiryDate, userId : strategy.userId,description : strategy.Description, strategySkeletonId : strategy.InvestmentStrategySkeletonId});
            return;
            var strategySkeletonId = strategy.InvestmentStrategySkeletonId;
            console.log(strategySkeletonId)

            var listInstrumentSkeleton = await db.GetInstrumentsFromStrategySkeletonId(strategySkeletonId);

            console.log(listInstrumentSkeleton)
        
            for(let j in listInstrumentSkeleton){
                var input = await db.getUserInputFromStrategySkeletonIdAndStrategyId(listInstrumentSkeleton[j].segment,listInstrumentSkeleton[j].Id,strategy.StrategyId)
            }
        }


    }

}

module.exports = InvestmentStrategy;