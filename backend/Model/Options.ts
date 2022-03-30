
var getDbConnection = require('../db/dbconnect');

import fetch from "node-fetch";

import StrategyPlot from './StrategyPlot';
var StrategyPlot_ = require('./StrategyPlot')
import IInstrumentSkeleton from './IInstrumentSkeleton';
import IInstrument from './IInstrument';
import OptionSkeleton from './OptionSkeleton';

import { time } from "console";
//import { Instrument } from './Instrument';
var Instrument = require('./Instrument');
var DbManager = require('./DbManager');

export default class Options extends Instrument{
   // static count : number = 0;
   // id : number;
   // quantity : number;
   // instrumentSkeleton : IInstrumentSkeleton;
    instrumentSkeletonId:number;
    strikePrice : number;
    strategyId:number;
    premium : number;
    currentPriceStock: number;
    //side : string;
    type : string;
    //plot : StrategyPlot;

    constructor(id:number, quantity:number, strikePrice:number, skeletonId:number, strategyId:number, type:string, side:string){
        super()
        this.id = id;
        this.quantity = quantity;
        this.strikePrice = strikePrice;
        this.instrumentSkeletonId = skeletonId;
        this.strategyId = strategyId;
        this.premium = 5;
        this.side = side;
        this.type = type;
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

        try{
            const DbManager_ = await new DbManager();
            var response = await DbManager_.GetCountOfRecordsInDb('Options');
        
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
        
        var sql = "INSERT INTO Options (Id, StrikePrice , Premium, Quantity, OptionSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?,?,?)";
        //var {Id, Type, Side, StrategySkeletonId} = {this.id, 

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id ,this.strikePrice, this.premium, this.quantity, instrumentSkeletonId, strategyId]); 
            connection.end()
            return response;

        }catch(err){
            console.log(err);
            return err;
        }

    }

    

    makePlot(xStart){
      //  var i = this.strikePrice - 30;

        var x = Math.floor(xStart);
        var y;

        this.plot = new StrategyPlot_();

        var str = this.side.toLowerCase() + " " + this.type.toLowerCase();
        this.premium = 10;
       console.log(str)
       console.log(this.premium)
       console.log(this.quantity)
        switch(str){


            case "buy call" : {

                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        
                        y = -(this.quantity*this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        this.plot.xCoords.push(x);
                        y = this.quantity*((x-this.strikePrice) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                  
                    x++;
                }
                console.log("****************************************************************")
                break;
            }

            case "buy put" : {
                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = this.quantity*((this.strikePrice -x) - this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        this.plot.xCoords.push(x);
                        y = -this.quantity*(this.premium);
                        this.plot.yCoords.push(y);
                    }
                    x++;
                }
                break;
            }

            case "sell call" : {
                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = (this.quantity*this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        this.plot.xCoords.push(x);
                        y = -1*this.quantity*((x-this.strikePrice) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                    x++;
                }
                break;
            }

            case "sell put":{
                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = -1*this.quantity*((this.strikePrice -x) - this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        this.plot.xCoords.push(x);
                        y = this.quantity*(this.premium);
                        this.plot.yCoords.push(y);
                    }
                    x++;
                }
            }

        }

        console.log(this.plot)
        return this.plot;
        
    }

    getPlot(): StrategyPlot {
        return this.plot;
    }

    async fetchCurrentPriceFromMarketData(ticker:string){
        let base: String = 'https://api.twelvedata.com/price?apikey=b99f631941204b32b0cd3abafc919341';
        let url : String = base + "&symbol=" + ticker;
        const response = await fetch(url);
        const data = await response.json();
        var price = 0;
        price = data.price; 
        //console.log(price);
        this.currentPriceStock = price;
    }


    async fetchPremiumFromMarketData(ticker:string, expiryDate:string){
    
        await this.fetchCurrentPriceFromMarketData(ticker);
        console.log(this.currentPriceStock);

        var intrinsicValue = 0;
        if(this.type == "Call" && this.currentPriceStock > this.strikePrice){
          intrinsicValue = this.currentPriceStock - this.strikePrice;
        }else if(this.type == "Put" && this.currentPriceStock < this.strikePrice){
          intrinsicValue = this.strikePrice - this.currentPriceStock;
        }
       
        var timeValue = 0;
        
        let date1: Date = new Date();
        let date2: Date = new Date(expiryDate);
        let timeInMilisec: number = date2.getTime() - date1.getTime();
        let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
        let monthsBetweenDates = daysBetweenDates/30;
        console.log(monthsBetweenDates);

        if(monthsBetweenDates > 2){
            timeValue = (monthsBetweenDates-2)*2;
        }

        this.premium = intrinsicValue + timeValue;

        if(daysBetweenDates < 10){
            this.premium = 2;
        }
        
        console.log(this.premium);
    }
    

}

//const op = new Options(1, 1, 170, 1, 1, "Call", "Call");

//op.fetchCurrentPriceFromMarketData("AAPL");
//op.fetchPremiumFromMarketData("AAPL", "2022/05/30");

module.exports = Options;

