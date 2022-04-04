/**
 * This file contains the definition of Future class.
 */

var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
var StrategyPlot_ = require('./StrategyPlot')
const DbManager = require('./DbManager');
import DbManager_ from './DbManager';
var Instrument = require('./Instrument');
const Constants = require('./Constants');


/**
 * Future is one of the financial instruments being used in the application. Future class holds the information 
 * of the future instrument in its objects. It is derived from the instrument class. 
 */
export default class Future extends Instrument{
    
    price : number;
    currentPrice : number;

    constructor(id:number, quantity:number, price:number, side:string){
        super()
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.side = side;
    }
    
  
  /**
   * Inserts the future object in future table.
   * @param instrumentSkeletonId 
   * @param strategyId - id of strategy to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(instrumentSkeletonId: number, strategyId: number){

                
        var sql = "INSERT INTO Future (Price, Quantity, FutureSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?)";
       
        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.price, this.quantity, instrumentSkeletonId, strategyId]); 
            connection.end()
            this.id = response.insertId;
            //console.log(response.insertId);
            return response;

        }catch(err){
            console.log(err);
            return err;
        }
    }
    
    /**
     * To make plot for future instrument and store the respective x & y coordinates in plot data member. 
     * @param xStart Starting x coordinate of plot
     * @param ticker - string type
     * @param expiryDate - date type
     */
    
    makePlot(xStart, ticker, expiryDate) {

        //sets the start x coordinate
        var x = Math.floor(xStart);
        var y;
        this.plot = new StrategyPlot_();
        
        var multiplier = 0;

        //handles two cases - buy and sell
        if(this.side.toLowerCase() == Constants.Buy){
            multiplier = 1;
        }else if (this.side.toLowerCase() == Constants.Sell){
            multiplier = -1;
        }else{
            //invalid case
            console.log("Invalid Case -> Other than sell/buy");
            multiplier = NaN;
        }

        //loop over the range and calculate y coordinates
        for(var i=0;i<100;i++){

            this.plot.xCoords.push(x);
            y = (multiplier) * (this.quantity*(x - this.price));
            this.plot.yCoords.push(y);
            x++;
        }

        //return this.plot;
    }

    /**
     * Getter for plot
     * @returns plot of future instrument
     */
    getPlot(): StrategyPlot {
        return this.plot;
    }
}

//var f = new Future(-1, 1, 70, "buy");
//f.setId();
//f.makePlot(20, "AAPL", "2022-03-01");
//var plot = f.getPlot();
//console.log(plot);


//var res = f.AddDataToDb(null, null);
//console.log(res.insertId);
//console.log(res);

module.exports = Future