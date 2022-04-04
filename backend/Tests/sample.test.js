var InvestmentStrategy  = require('../Model/InstrumentSkeleton');
var Stock = require('../Model/Stock')
var StrategyPlot = require('../Model/StrategyPlot')

var len =100;

test('Buy Stock',async () => {

    var id = -1;
    var quantity = 1;
    var price = 200;
    var side = "BUY";
  
    var stock = new Stock(id,quantity,price,side);
    stock.makePlot(price-50);
    var plot = stock.getPlot();
    
    var tempArr = {
      "x" : [150,175,200,225],
      "y" : [-50,-25,0,25]
    }
    var index=0;

    expect(plot.xCoords.length).toBe(len);
    expect(plot.yCoords.length).toBe(len);

    for(let i in plot.xCoords){
        if(plot.xCoords[i]==tempArr.x[index]){
          expect(plot.yCoords[i]).toBe(tempArr.y[index])
          index++;
        }
    }
  });