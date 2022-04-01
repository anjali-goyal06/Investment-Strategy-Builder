var Future = require("./Future");
import IInstrument from "./IInstrument";
var Options  = require("./Options");
var Stock = require("./Stock");

/**
 * Manager Class for Instruments.
 * Has been used for implementing factory design pattern for creating appropriate instrument object. 
**/

export default class InstrumentManager{

    constructor(){
        // constructor implementation
    }
    
   /**
    * Purpose - It creates and returns the appropriate instrument object.
    * @param instrumentType specifies the type of instrument object to be created, type -string
    * @param quantity - type number, quantity of instrument
    * @param strikePrice - type number, strike price of instrument
    * @param price - type number, strike price of instrument
    * @param type - type string, type of instrument
    * @param side - type string, side of instrument (buy or sell)
    * @returns IInstrument type object of respective instrument
    */
    createInstrument(instrumentType: string, quantity:number, strikePrice:number, price:number, type:string, side:string) : IInstrument{
       if(instrumentType == 'option'){
           return new Options(-1, quantity, strikePrice, -1, -1, type, side);
       }else if(instrumentType == 'future'){
           return new Future(-1, quantity, price, -1, -1, side);
       }else{
           return new Stock(-1, quantity, price, -1, -1 , side);
       }
    }
}

module.exports = InstrumentManager;