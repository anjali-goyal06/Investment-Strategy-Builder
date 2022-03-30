
var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
var StrategyPlot_ = require('./StrategyPlot')
import IInstrumentSkeleton from './IInstrumentSkeleton';
import IInstrument from './IInstrument'

var DbManager = require('./DbManager');
var Instrument = require('./Instrument');


export default class Future extends Instrument{
   // id : number;
   // quantity : number;
    //instrumentSkeleton : IInstrumentSkeleton;
    instrumentSkeletonId : number;
    strategyId:number;
    //side:string;
    price : number;
    //plot : StrategyPlot;
    currentPrice : number;

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
            var response = await DbManager_.GetCountOfRecordsInDb('Future');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
        
        
       // console.log(this.id);
    }
    
   
    async AddDataToDb(instrumentSkeletonId: number, strategyId: number){

        if(this.id == -1){
            await this.setId();
        }
                
        var sql = "INSERT INTO Future (Id, Price, Quantity, FutureSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?,?)";
       
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
            for(var i=0;i<100;i++){
                if(x<=this.price){
                    this.plot.xCoords.push(x);
                    y = this.quantity*(x - this.price);
                    this.plot.yCoords.push(y);
                }else{
                    this.plot.xCoords.push(x);
                    y = -1*this.quantity*(x - this.price);
                    this.plot.yCoords.push(y);
                }
                x++;
            }
        }
        return this.plot;

    }

    getPlot(): StrategyPlot {
        return this.plot;
    }
}

var f = new Future(1, 1, 1, 1, 1, "buy");
f.setId();

module.exports = Future