
var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
import IInstrumentSkeleton from './IInstrumentSkeleton';
import IInstrument from './IInstrument'


export default class Future implements IInstrument{
    id : number;
    quantity : number;
    instrumentSkeleton : IInstrumentSkeleton;
    instrumentSkeletonId : number;
    strategyId:number;
    side:string;
    price : number;
    plot : StrategyPlot;
    currentPrice : number;

    constructor(id:number, quantity:number, price:number, skeletonId:number, strategyId:number){
        
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.instrumentSkeletonId = skeletonId;
        this.strategyId = strategyId;
    }

    async setId(){

        //var Db = new DbManager();
       // var result = Db.GetCountOfRecordsInDb("user");
       var sql = "Select  count(*) as count from Future";

       const connection = await getDbConnection();
       var response = await connection.query(sql); 
       connection.end()
        
        this.id = response[0].count + 1;
        console.log(this.id);

    }
    
   
    async AddDataToDb(){

        if(this.id == -1){
            await this.setId();
        }
        
     
        
        var sql = "INSERT INTO Future (Id, Price, Quantity, FutureSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?,?)";
        //var {Id, Type, Side, StrategySkeletonId} = {this.id, 

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id ,this.price, this.quantity, this.instrumentSkeletonId, this.strategyId]); 
            connection.end()
            return response;

        }catch(err){
            console.log(err);
            return err;
        }
    }

    makePlot() {
        
        if(this.side=="BUY"){

            var x = Math.floor(this.price-50);
            var y;

            for(var i=0;i<100;i++){

                if(x<=this.price){
                    this.plot.xCoords.push(x);
                    y = -1*this.quantity*(this.currentPrice - this.price);
                    this.plot.yCoords.push(y);
                }else{
                    y = this.quantity*(this.currentPrice - this.price);
                    this.plot.yCoords.push(y);
                }
            }
        }else{
            if(x<=this.price){
                this.plot.xCoords.push(x);
                y = this.quantity*(this.currentPrice - this.price);
                this.plot.yCoords.push(y);
            }else{
                y = -1*this.quantity*(this.currentPrice - this.price);
                this.plot.yCoords.push(y);
            }
        }

    }

    getPlot(): StrategyPlot {
        return this.plot;
    }
}

module.exports = Future