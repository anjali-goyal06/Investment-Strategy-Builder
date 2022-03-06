interface IInstrument{
    id : number;
    quantity : number;
    side : string
    plot : StrategyPlot;
    instrumentSkeleon : IInstrumentSkeleton;

    makePlot()
    getPlot() : StrategyPlot
}