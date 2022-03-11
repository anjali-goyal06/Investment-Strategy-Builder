import { StrategyPlot } from "./StrategyPlot";
import { IInstrumentSkeleton } from "./IInstrumentSkeleton";
export interface IInstrument{
    id : number;
    quantity : number;
    plot : StrategyPlot;
    instrumentSkeleton : IInstrumentSkeleton;

    makePlot()
    getPlot() : StrategyPlot
}