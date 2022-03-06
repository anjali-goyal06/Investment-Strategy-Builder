
class Stock implements IInstrument{
    id : number;
    quantity : number;
    instrumentSkeleon : IInstrumentSkeleton;
    price : number;
    side : string;
    plot : StrategyPlot;
    currentPrice:number

    makePlot() {
        
        if(this.side=="BUY"){

            var x = Math.floor(this.price-50);
            var y;

            for(var i=0;i<100;i++){

                if(x<=this.price){
                    this.plot.xCoords.push(x);
                    y = -1*this.quantity*(this.currentPrice - this.price);
                    this.plot.yCoords.push(y);
                }else{
                    y = this.quantity*(this.currentPrice - this.price);
                    this.plot.yCoords.push(y);
                }
            }
        }else{
            if(x<=this.price){
                this.plot.xCoords.push(x);
                y = this.quantity*(this.currentPrice - this.price);
                this.plot.yCoords.push(y);
            }else{
                y = -1*this.quantity*(this.currentPrice - this.price);
                this.plot.yCoords.push(y);
            }
        }

    }

    getPlot(): StrategyPlot {
        return this.plot;
    }
}