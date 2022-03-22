import IInstrument from "./IInstrument";
import StrategyPlot from "./StrategyPlot";
import IInstrumentSkeleton from "./IInstrumentSkeleton";

export default class Instrument implements IInstrument{
    id;
    quantity;
    side;
    plot;
    instrumentSkeleton;
    makePlot(x) {}
    getPlot() :  StrategyPlot {return this.plot;};
}

module.exports = Instrument;