import IInstrument from "./IInstrument";
import StrategyPlot from "./StrategyPlot";
import IInstrumentSkeleton from "./IInstrumentSkeleton";

export class Instrument implements IInstrument{
    id;
    quantity;
    side;
    plot;
    instrumentSkeleton;
    makePlot() {}
    getPlot() :  StrategyPlot {return this.plot;};
}