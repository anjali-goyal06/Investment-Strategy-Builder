import StrategyPlot from './StrategyPlot';
import IInstrumentSkeleton from './IInstrumentSkeleton';

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