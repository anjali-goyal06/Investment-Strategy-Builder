import StrategyPlot from './StrategyPlot';
import IInstrumentSkeleton from './IInstrumentSkeleton';

export default interface IInstrument{

    id : number;
    quantity : number;
    side : string
    plot :  StrategyPlot;
    instrumentSkeleton :  IInstrumentSkeleton;
    makePlot(x:number)
    getPlot() :  StrategyPlot;
}

//module.exports = IInstrument