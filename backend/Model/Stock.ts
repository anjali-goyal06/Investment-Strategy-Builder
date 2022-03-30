
var getDbConnection = require('../db/dbconnect');
import StrategyPlot from './StrategyPlot';
import IInstrumentSkeleton from './IInstrumentSkeleton';
import IInstrument from './IInstrument';
var Instrument =  require('./Instrument');
var DbManager = require('./DbManager');
var StrategyPlot_ = require('./StrategyPlot')

export default class Stock extends Instrument{
    //id : number;
    //quantity : number;
    //instrumentSkeleton : IInstrumentSkeleton;
    instrumentSkeletonId:number;
    strategyId:number;
    price : number;
    //side:string;
    //plot : StrategyPlot;
    currentPrice:number

    constructor(id:number, quantity:number, price:number, skeletonId:number, strategyId:number, side:string){
        super()
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.side = side;
        this.instrumentSkeletonId = skeletonId;
        this.strategyId = strategyId;
    }

    async setId(){
        try{
            const DbManager_ = await new DbManager();
            var response = await DbManager_.GetCountOfRecordsInDb('Stock');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
    }
    
   
    async AddDataToDb(instrumentSkeletonId: number, strategyId: number){

        if(this.id == -1){
            await this.setId();
        }
        
        //console.log(this.OptionSkeleton);
        
        var sql = "INSERT INTO Stock (Id, Price, Quantity, StockSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?,?)";
        //var {Id, Type, Side, StrategySkeletonId} = {this.id, 

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id ,this.price, this.quantity, instrumentSkeletonId, strategyId]); 
            connection.end()
            return response;

        }catch(err){
            console.log(err);
            return err;
        }
    }

    makePlot(xStart) {

        var x = Math.floor(xStart);
        var y;
        
        this.plot = new StrategyPlot_();
        
        if(this.side.toLowerCase()=="buy"){

            for(var i=0;i<100;i++){

                if(x<=this.price){
                    this.plot.xCoords.push(x);
                    y = -1*this.quantity*(x - this.price);
                    this.plot.yCoords.push(y);
                }else{
                    this.plot.xCoords.push(x);
                    y = this.quantity*(x - this.price);
                    this.plot.yCoords.push(y);
                }
                x++;
            }
        }else{
            if(x<=this.price){
                this.plot.xCoords.push(x);
                y = this.quantity*(this.currentPrice - this.price);
                this.plot.yCoords.push(y);
            }else{
                this.plot.xCoords.push(x);
                y = -1*this.quantity*(this.currentPrice - this.price);
                this.plot.yCoords.push(y);
            }
            x++;
        }
        return this.plot;
    }

    getPlot(): StrategyPlot {
        return this.plot;
    }
}

module.exports = Stock;