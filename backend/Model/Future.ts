
var getDbConnection = require('../db/dbconnect');

import StrategyPlot from './StrategyPlot';
var StrategyPlot_ = require('./StrategyPlot')
const DbManager = require('./DbManager');
import DbManager_ from './DbManager';
var Instrument = require('./Instrument');



export default class Future extends Instrument{
    
    price : number;
    currentPrice : number;

    constructor(id:number, quantity:number, price:number,side:string){
        super()
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.side = side;
    }

    /*
    Purpose - Fetches current record count in the table and sets id of current record to current record count plus one.
    Parameters - None
    Return Value - None
    */
    async setId(){

        try{
            var dbManager_ = await new DbManager();
            var response = await dbManager_.GetCountOfRecordsInDb('Future');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
        
    }
    
  
  /**
   *  Purpose - Inserts the future object in future table.
   * @param instrumentSkeletonId 
   * @param strategyId - id of strategy to which it belongs must be provided
   * @returns sql query response on successful insertion. In case of any errors, returns the error.
   */
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
    
    /**
     * Purpose - To make plot for future instrument and store the respective x & y coordinates in plot data member. 
     * @param xStart Starting x coordinate of plot
     * @param ticker - string type
     * @param expiryDate - date type
     */
    makePlot(xStart, ticker, expiryDate) {
      
      console.log("future")

        //sets the start x coordinate
        var x = Math.floor(xStart);
        var y;
        this.plot = new StrategyPlot_();
        
        //handles two cases - buy and sell
        if(this.side.toLowerCase()=="buy"){
            
            //loop over the range and calculate y coordinates
            for(var i=0;i<100;i++){

                if(x<=this.price){
                    this.plot.xCoords.push(x);
                    y = this.quantity*(x - this.price);
                    this.plot.yCoords.push(y);
                }else{
                    this.plot.xCoords.push(x);
                    y = this.quantity*(x - this.price);
                    this.plot.yCoords.push(y);
                }
                x++;
            }
        }else{

            //loop over the range and calculate y coordinates
            for(var i=0;i<100;i++){
                if(x<=this.price){
                    this.plot.xCoords.push(x);
                    y = -1*this.quantity*(x - this.price);
                    this.plot.yCoords.push(y);
                }else{
                    this.plot.xCoords.push(x);
                    y = -1*this.quantity*(x - this.price);
                    this.plot.yCoords.push(y);
                }
                x++;
            }
        }
        //return this.plot;
    }

    getPlot(): StrategyPlot {
        return this.plot;
    }
}


module.exports = Future