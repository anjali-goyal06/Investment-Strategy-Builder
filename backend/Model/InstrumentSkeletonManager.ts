

import IInstrumentSkeleton from "./IInstrumentSkeleton";
var FutureSkeleton = require("./FutureSkeleton");
var OptionSkeleton  = require("./OptionSkeleton");
var StockSkeleton = require("./StockSkeleton");


export default class InstrumentSkeletonManager{

    constructor(){

    }

    createInstrument(instrumentType: string,  type:string, side:string) : IInstrumentSkeleton{
       if(instrumentType == 'option'){
           return new OptionSkeleton(-1, side, type, -1);
       }else if(instrumentType == 'future'){
           return new FutureSkeleton(-1, side, -1);
       }else {
           return new StockSkeleton(-1, side, -1);
       }
    }
}

module.exports = InstrumentSkeletonManager;