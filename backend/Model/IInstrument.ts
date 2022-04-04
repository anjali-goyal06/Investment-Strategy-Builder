/**
 * This file contains the definition of interface 'IInstrument'. This interface is implemented by the instrument class. 
 */
import StrategyPlot from './StrategyPlot';
import IInstrumentSkeleton from './IInstrumentSkeleton';

/**
 * IInstrument interface wraps the common attributes and functions of all the instruments in it. It is then implemented 
 * by the instrument class.
 */
export default interface IInstrument{

    id : number;
    quantity : number;
    side : string
    plot :  StrategyPlot;
    instrumentSkeleton :  IInstrumentSkeleton;
    makePlot(x:number, ticker:String, expiryDate:Date);
    getPlot() :  StrategyPlot;
}

//module.exports = IInstrument