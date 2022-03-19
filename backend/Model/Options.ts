
var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
import IInstrumentSkeleton from './IInstrumentSkeleton';
import IInstrument from './IInstrument';
import OptionSkeleton from './OptionSkeleton';

export default class Options implements IInstrument{
    static count : number = 0;
    id : number;
    quantity : number;
    instrumentSkeleton : IInstrumentSkeleton;
    instrumentSkeletonId:number;
    strikePrice : number;
    strategyId:number;
    premium : number;
    side : string;
    type : string;
    plot : StrategyPlot;

    constructor(id:number, quantity:number, strikePrice:number, skeletonId:number, strategyId:number){
        
        this.id = id;
        this.quantity = quantity;
        this.strikePrice = strikePrice;
        this.instrumentSkeletonId = skeletonId;
        this.strategyId = strategyId;
        this.premium = 5;
    }

    printValues(){
        console.log(this.id);
        console.log(this.quantity);
        console.log(this.strikePrice);
        console.log(this.strategyId);
        console.log(this.side);
        console.log(this.type);
        console.log(this.premium);

    }
    
    setSkeleton(obj : OptionSkeleton){
        this.instrumentSkeleton = obj;
        this.instrumentSkeletonId = obj.id;
    }

    async setId(){

        //var Db = new DbManager();
       // var result = Db.GetCountOfRecordsInDb("user");
       var sql = "Select  count(*) as count from Options";

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
        
        var sql = "INSERT INTO Options (Id, StrikePrice , Premium, Quantity, OptionSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?,?,?)";
        //var {Id, Type, Side, StrategySkeletonId} = {this.id, 

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id ,this.strikePrice, this.premium, this.quantity, this.instrumentSkeletonId, this.strategyId]); 
            connection.end()
            return response;

        }catch(err){
            console.log(err);
            return err;
        }

    }

    fetchPremiumFromMarketData(){

    }

    makePlot(){
      //  var i = this.strikePrice - 30;

        var x = Math.floor(this.strikePrice-50);
        var y;

        var str = this.side + " " + this.type;

       
        switch(str){


            case "BUY CALL" : {

                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = -(this.quantity*this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        y = this.quantity*((x-this.strikePrice) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }

            case "BUY PUT" : {
                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = this.quantity*((this.strikePrice -x) - this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        y = -this.quantity*(this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }

            case "SELL CALL" : {
                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = (this.quantity*this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        y = -1*this.quantity*((x-this.strikePrice) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }

            case "SELL PUT":{
                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = -1*this.quantity*((this.strikePrice -x) - this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        y = this.quantity*(this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }



        }

        
    }

    getPlot(): StrategyPlot {
        return this.plot;
    }

}

module.exports = Options;