import Future from "./Future";
import IInstrument from "./IInstrument";
import {Options} from "./Options";
import Stock from "./Stock";

export class InstrumentManager{
    static createInstrument(instrumentType: string, quantity:number, strikePrice:number, price:number, type:string, side:string) : IInstrument{
       if(instrumentType == 'option'){
           return new Options(-1, quantity, strikePrice, -1, -1, type, side);
       }else if(instrumentType == 'future'){
           return new Future(-1, quantity, price, -1, -1, side);
       }else{
           return new Stock(-1, quantity, price, -1, -1 , side);
       }
    }
}