
var getDbConnection = require('../db/dbconnect');

import fetch from "node-fetch";

import StrategyPlot from './StrategyPlot';
var StrategyPlot_ = require('./StrategyPlot')
import OptionSkeleton from './OptionSkeleton';

import { time } from "console";
var Instrument = require('./Instrument');
const DbManager = require('./DbManager');
import DbManager_ from './DbManager';
const Constants = require('./Constants');

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
    Fetches current record count in options table and sets id of current record to current record count plus one.
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
   * Inserts the options object in options table.
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
     * To make plot for option instrument and store the respective x & y coordinates in plot data member. 
     * @param xStart Starting x coordinate of plot
     * @param ticker - string type
     * @param expiryDate - date type
     */
    makePlot(xStart, ticker, expiryDate){

      //sets starting x coordinate of plot
        var x = Math.floor(xStart);
        var y;

        this.plot = new StrategyPlot_();

        var str = this.side.toLowerCase() + " " + this.type.toLowerCase();
       
        //setting premium before plot calculation
       // this.setPremium(ticker, expiryDate);
        this.premium = 5;
        console.log("premium = " + this.premium);
      
        //handles 4 cases - BUY CALL, SELL CALL, BUY PUT , SELL PUT
        switch(str){

            case Constants.BuyCall : {

                //loop over the range and calculate y coordinate for every x in range
                for(var i=0;i<100;i++){

                    this.plot.xCoords.push(x);
                    var x2 = Math.max(x, this.strikePrice);
                    y = this.quantity*((x2-this.strikePrice) - this.premium);
                    this.plot.yCoords.push(y);
                    x++;
                }
                break;
            }

            case Constants.BuyPut : {

                //loop over the range and calculate y coordinate for every x in range
                for(var i=0;i<100;i++){

                    this.plot.xCoords.push(x);
                    var x2 = Math.min(x, this.strikePrice);
                    y = this.quantity*((this.strikePrice -x2) - this.premium);
                    this.plot.yCoords.push(y);
                    x++;
                }
                break;
            }

            case Constants.SellCall : {

                //loop over the range and calculate y coordinate for every x in range
                for(var i=0;i<100;i++){

                    this.plot.xCoords.push(x);
                    var x2 = Math.max(x, this.strikePrice);
                    y = -1*this.quantity*((x2-this.strikePrice) - this.premium);
                    this.plot.yCoords.push(y);
                    x++;
                }
                break;
            }

            case Constants.SellPut :{

                //loop over the range and calculate y coordinate for every x in range
                for(var i=0;i<100;i++){

                    this.plot.xCoords.push(x);
                    var x2 = Math.min(x, this.strikePrice);
                    y = -1*this.quantity*((this.strikePrice -x2) - this.premium);
                    x++;
                }
            }

        }
        
    }

    /** 
    * Returns the plot.
    * Parameters - None
    * @returns - Plot (StrategyPlot type)
    */
    getPlot(): StrategyPlot {
        return this.plot;
    }

   /**
    * To fetch the current price of a given stock in the market using TwelveData API
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
    * Sets the premium of the option contract according to the strike price and expiry date
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
        
        console.log("Premium = " + this.premium);
    }

}

var op = new Options(-1, 1, 198, "Put", "buy");
//let d:Date = new Date("2022/5/3");
//op.fetchCurrentPriceFromMarketData("AAPL");
//op.setPremium("AAPL", d);
op.makePlot(135,"AAPL", "2022-05-15");
var plot = op.getPlot();
console.log(plot);

module.exports = Options;

