
import StrategyPlot from './StrategyPlot';
import IInstrument from './IInstrument';

export default class InvestmentStrategy{

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

    constructor(jsonData){

        //this.name = jsonData.name

    }

    AddSkeleton(){

    }

    AddStrategy(){

    }

    combinedPlot(){
       // let i : keyof IInstrument
        for(let k in this.instruments){
            let tempPlot:StrategyPlot = this.instruments[k].getPlot();
            
            let tempX = tempPlot.xCoords;
            let tempY = tempPlot.yCoords;

            for(let i in this.plot.xCoords){
                this.plot.yCoords[i] += tempY[i];
            }
        }
    }

    getStrategySkeleton(){

    }

}
