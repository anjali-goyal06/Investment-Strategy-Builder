
var getDbConnection = require('../db/dbconnect');
import StrategyPlot from './StrategyPlot';
var Instrument =  require('./Instrument');
const DbManager = require('./DbManager');
const Constants = require('./Constants');
import DbManager_ from './DbManager';
var StrategyPlot_ = require('./StrategyPlot')

export default class Stock extends Instrument{

    price : number;
    currentPrice:number

    constructor(id:number, quantity:number, price:number, side:string){
        super()
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.side = side;
    }

    
    /**
     * Fetches current record count in stock table and sets id of current record to current record count plus one.
     * Parameters - None
     * Return Value - None
     */
    async setId(){
        try{
            var dbManager_ = await new DbManager();
            var response = await dbManager_.GetCountOfRecordsInDb('Stock');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
    }

     
  /**
   * Inserts the stock object in stock table.
   * @param instrumentSkeletonId 
   * @param strategyId - id of strategy to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
    async AddDataToDb(instrumentSkeletonId: number, strategyId: number){

        //sets id before inserting in table
        if(this.id == -1){
            await this.setId();
        }
        
        
        var sql = "INSERT INTO Stock (Id, Price, Quantity, StockSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?,?)";

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

    /**
     * To make plot for stock instrument and store the respective x & y coordinates in plot data member. 
     * @param xStart Starting x coordinate of plot
     * @param ticker - string type
     * @param expiryDate - date type
     */
    makePlot(xStart, ticker, expiryDate) {
      
        //set the start coordinate of x
        var x = Math.floor(xStart);
        var y;
       
        this.plot = new StrategyPlot_();

        var multiplier = 0;

        //two cases handled - buy and sell
        if(this.side.toLowerCase() == Constants.Buy){
            multiplier = 1;
        }else if(this.side.toLowerCase() == Constants.Sell){
            multiplier = -1;
        }else{
            //invalid case
            console.log("Invalid Case");
            multiplier = NaN;
        }

        //loop over the range and calculate y coordinate 
        for(var i=0;i<100;i++){

            this.plot.xCoords.push(x);
            y = (multiplier)*(this.quantity*(x - this.price));
            this.plot.yCoords.push(y);

            x++;
        }
       // return this.plot;
    }

    /**
     * Getter for plot
     * @returns plot of stock instrument
     */
    getPlot(): StrategyPlot {
        return this.plot;
    }
}


module.exports = Stock;