var Future = require("./Future");
import IInstrument from "./IInstrument";
var Options  = require("./Options");
var Stock = require("./Stock");


export default class InstrumentManager{

    constructor(){

    }

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