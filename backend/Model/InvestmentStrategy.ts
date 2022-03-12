
import StrategyPlot from './StrategyPlot';
import IInstrument from './IInstrument';
import DbManager from './DbManager'

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
            
           // let tempX = tempPlot.xCoords;
            let tempY = tempPlot.yCoords;

            for(let i in this.plot.xCoords){
                this.plot.yCoords[i] += tempY[i];
            }
        }
    }

    getStrategySkeleton(){

    }

    async fetchStrategyWithValuesFromDb(){

        var db = new DbManager();
        var userId;
        // get userId from db

        var arrStrategy =  await db.GetSavedStrategiesFromUserId;
        var response;

        for(var i in arrStrategy){
            var strategy = arrStrategy[i];

            var strategyId = strategy.InvestmentStrategySkeletonId;

            var listInstrumentSkeleton = await db.GetInstrumentsFromStrategySkeletonId(strategyId);

            for(let j in listInstrumentSkeleton){

                var input = await db.getUserInputFromStrategySkeletonIdAndStrategyId(listInstrumentSkeleton[i].segment,listInstrumentSkeleton[i].Id,listInstrumentSkeleton[i].InvestmentStrategySkeletonId)
                
                console.log("\n\n");
                console.log(strategy);
                console.log(listInstrumentSkeleton[i]);
                console.log(input)
                
            }
        }


    }

}
