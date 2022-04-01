

import IInstrumentSkeleton from "./IInstrumentSkeleton";
var FutureSkeleton = require("./FutureSkeleton");
var OptionSkeleton  = require("./OptionSkeleton");
var StockSkeleton = require("./StockSkeleton");

/**
 * Manager Class for Instrument skeletons.
 * Has been used for implementing factory design pattern for creating appropriate instrument skeleton object. 
**/

export default class InstrumentSkeletonManager{

    constructor(){

    }

    
   /**
    * Purpose - It creates and returns the appropriate instrument skeleton object.
    * @param instrumentType - specifies the type of instrument skeleton object to be created, type = string
    * @param type 
    * @param side 
    * @returns IInstrumentSkeleton type object of respective instrument skelton
    */
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