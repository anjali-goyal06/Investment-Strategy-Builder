
var getDbConnection = require('../db/dbconnect');

import fetch from "node-fetch";

import StrategyPlot from './StrategyPlot';
var StrategyPlot_ = require('./StrategyPlot')
import OptionSkeleton from './OptionSkeleton';

import { time } from "console";
var Instrument = require('./Instrument');
const DbManager = require('./DbManager');
import DbManager_ from './DbManager';

export default class Options extends Instrument{

    strikePrice : number;
    premium : number;
    currentPriceStock: number;
    type : string;

    constructor(id:number, quantity:number, strikePrice:number,  type:string, side:string){
        super()
        this.id = id;
        this.quantity = quantity;
        this.strikePrice = strikePrice;
        this.premium = 5;
        this.side = side;
        this.type = type;
    }

    setSkeleton(obj : OptionSkeleton){
        this.instrumentSkeleton = obj;
        this.instrumentSkeletonId = obj.id;
    }

    /*
    Purpose - Fetches current record count in options table and sets id of current record to current record count plus one.
    Parameters - None
    Return Value - None
    */
    async setId(){

        try{
            var dbManager_ = await new DbManager();
            var response = await dbManager_.GetCountOfRecordsInDb('Options');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
    }
    
   
  /**
   * Purpose - Inserts the options object in options table.
   * @param instrumentSkeletonId 
   * @param strategyId - id of strategy to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(instrumentSkeletonId: number, strategyId: number){

        //sets id before inserting in db
        if(this.id == -1){
            await this.setId();
        }
            
        var sql = "INSERT INTO Options (Id, StrikePrice , Premium, Quantity, OptionSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?,?,?)";

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


   /**
     * Purpose - To make plot for option instrument and store the respective x & y coordinates in plot data member. 
     * @param xStart Starting x coordinate of plot
     * @param ticker - string type
     * @param expiryDate - date type
     */
    async makePlot(xStart, ticker, expiryDate){
      //  var i = this.strikePrice - 30;

      //sets starting x coordinate of plot
        var x = Math.floor(xStart);
        var y;

        console.log("x val = " + x);

        this.plot = new StrategyPlot_();

        var str = this.side.toLowerCase() + " " + this.type.toLowerCase();
       
        //setting premium before plot calculation
        await this.setPremium(ticker, expiryDate);

        console.log("premium = " + this.premium);
      
        //handles 4 cases - BUY CALL, SELL CALL, BUY PUT , SELL PUT
        switch(str){


            case "buy call" : {

                //loop over the range and calculate y coordinate for every x in range
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
               
                break;
            }

            case "buy put" : {

                //loop over the range and calculate y coordinate for every x in range
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

                //loop over the range and calculate y coordinate for every x in range
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

                //loop over the range and calculate y coordinate for every x in range
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

        //console.log(this.plot)
       // return this.plot;
        
    }

    /** 
    * Purpose - Returns the plot.
    * Parameters - None
    * @returns - Plot (StrategyPlot type)
    */
    getPlot(): StrategyPlot {
        return this.plot;
    }

   /**
    * Purpose - To fetch the current price of a given stock in the market using TwelveData API
    * @param ticker 
    * Return Value - None. Sets the currentPriceStock data member to current price
    */
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


   /**
    * Purpose - Sets the premium of the option contract according to the strike price and expiry date
    * @param ticker 
    * @param expiryDate 
    * Return Value - None, Sets the premium
    */
    async setPremium(ticker:string, expiryDate:Date){
    
        await this.fetchCurrentPriceFromMarketData(ticker);
        console.log(this.currentPriceStock);


        var intrinsicValue = 0;
        intrinsicValue = Math.abs(this.currentPriceStock - this.strikePrice);
        console.log(intrinsicValue);

       // if(this.type == "Call" && this.currentPriceStock > this.strikePrice){
         // intrinsicValue = this.currentPriceStock - this.strikePrice;
        //}else if(this.type == "Put" && this.currentPriceStock < this.strikePrice){
          //intrinsicValue = this.strikePrice - this.currentPriceStock;
       // }

       
        var timeValue = 0;
        
        let date1: Date = new Date();
        let date2: Date = new Date(expiryDate);
        console.log("date2 = " + date2 + " " + date2.getTime() + " " + date1.getTime())
        let timeInMilisec: number = date2.getTime() - date1.getTime();
        let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
        let monthsBetweenDates = daysBetweenDates/30;

        console.log(monthsBetweenDates);
       
        timeValue = monthsBetweenDates*8;

        this.premium = intrinsicValue + timeValue;

        if(daysBetweenDates < 5){
            this.premium = intrinsicValue;
        }

        this.premium = Math.floor(this.premium);
        
        console.log(this.premium);
    }

}

//const op = new Options(1, 1, 190, 1, 1, "Call", "Call");
//let d:Date = new Date("2022/5/3");
//op.fetchCurrentPriceFromMarketData("AAPL");
//op.setPremium("AAPL", d);

module.exports = Options;

