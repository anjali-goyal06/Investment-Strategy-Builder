
class InvestmentStrategy{
    id : number;
    stockName : string;
    ticker : string;
    currentStockPrice : Float32Array;
    userId : number;
    expiryDate : Date;
    plot : StrategyPlot;
    strategyName  :string;
    description : string;
    instruments : IInstrument[];

    constructor(){

    }

    combinedPlot(){
        var tempPlot; 
        for(var i in this.instruments){
        //    tempPlot  = i.getPlot();
        }
    }

    getStrategySkeleton(){

    }

}