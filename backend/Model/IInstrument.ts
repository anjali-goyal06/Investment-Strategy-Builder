import StrategyPlot from './StrategyPlot';
import IInstrumentSkeleton from './IInstrumentSkeleton';

export default interface IInstrument{

    id : number;
    quantity : number;
    side : string
    plot :  StrategyPlot;
    instrumentSkeleon :  IInstrumentSkeleton;

    makePlot()
    getPlot() :  StrategyPlot;
}

//module.exports = IInstrument