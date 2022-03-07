import StrategyPlot from './StrategyPlot';
import IInstrumentSkeleton from './IInstrumentSkeleton';
import IInstrument from './IInstrument';
class Options implements IInstrument{
    id : number;
    quantity : number;
    instrumentSkeleon : IInstrumentSkeleton;
    strikePrice : number;
    premium : number;
    side : string;
    plot : StrategyPlot;


    constructor(){

    }

    Add(){

    }

    fetchPremiumFromMarketData(){

    }
    makePlot() {
      //  var i = this.strikePrice - 30;

        var x = Math.floor(this.strikePrice-50);
        var y;

        switch(this.side){

            case "BUY CALL" : {

                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = -(this.quantity*this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        y = this.quantity*((x-this.strikePrice) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }

            case "BUY PUT" : {
                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = this.quantity*((this.strikePrice -x) - this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        y = -this.quantity*(this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }

            case "SELL CALL" : {
                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = (this.quantity*this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        y = -1*this.quantity*((x-this.strikePrice) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }

            case "SELL PUT":{
                for(var i=0;i<100;i++){

                    if(x<=this.strikePrice){
                        this.plot.xCoords.push(x);
                        y = -1*this.quantity*((this.strikePrice -x) - this.premium);
                        this.plot.yCoords.push(y);
                    }else{
                        y = this.quantity*(this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }



        }

        
    }

    getPlot(): StrategyPlot {
        return this.plot;
    }

}