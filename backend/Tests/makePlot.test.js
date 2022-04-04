const Constants = require('../Model/Constants');
var InvestmentStrategy  = require('../Model/InstrumentSkeleton');
var Stock = require('../Model/Stock')
var Future = require('../Model/Future')
var Options = require('../Model/Options');


var len = 100;


test(Constants.BuyStock,async () => {

    var id = -1;
    var quantity = 1;
    var price = 200;
    var side = "BUY";
  
    var stock = new Stock(id,quantity,price,side);
    await stock.makePlot(price-50);
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


  test(Constants.BuyFuture, async () => {

    var id = -1;
    var quantity = 1;
    var price = 180;
    var side = "BUY";
  
    var future = new Future(id,quantity,price,side);
    await future.makePlot(price-50);
    var plot = future.getPlot();
    
    var tempArr = {
      "x" : [130,150,180,220, 229],
      "y" : [-50,-30,0,40, 49]
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

  test(Constants.SellFuture, async () => {

    var id = -1;
    var quantity = 1;
    var price = 180;
    var side = "SELL";
  
    var future = new Future(id,quantity,price,side);
    await future.makePlot(price-50);
    var plot = future.getPlot();
    
    var tempArr = {
      "x" : [130,150,185,220, 229],
      "y" : [50,30,-5,-40, -49]
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

  test(Constants.BuyCallOptions, async () => {

    var id = -1;
    var quantity = 1;
    var price = 190;
    var side = "buy";
    var type = "call";
    var premium = 20;
  
    var option = new Options(id, quantity, price, type, side, premium);
    await option.makePlot(price-50);
    var plot = option.getPlot();
    
    var tempArr = {
      "x" : [140,180, 215, 239],
      "y" : [-20, -20, 5, 29]
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

  
  test(Constants.BuyPutOptions, async () => {

    var id = -1;
    var quantity = 1;
    var price = 190;
    var side = "buy";
    var type = "put";
    var premium = 20;
  
    var option = new Options(id, quantity, price, type, side, premium);
    await option.makePlot(price-50);
    var plot = option.getPlot();
    
    var tempArr = {
      "x" : [140, 155, 215, 239],
      "y" : [30, 15, -20, -20]
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

  test(Constants.SellCallOptions, async () => {

    var id = -1;
    var quantity = 1;
    var price = 190;
    var side = "sell";
    var type = "call";
    var premium = 20;
  
    var option = new Options(id, quantity, price, type, side, premium);
    await option.makePlot(price-50);
    var plot = option.getPlot();
    
    var tempArr = {
      "x" : [140, 165, 215, 239],
      "y" : [20, 20, -5, -29]
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

  test(Constants.SellPutOptions, async () => {

    var id = -1;
    var quantity = 1;
    var price = 190;
    var side = "sell";
    var type = "put";
    var premium = 20;
  
    var option = new Options(id, quantity, price, type, side, premium);
    await option.makePlot(price-50);
    var plot = option.getPlot();
    
    var tempArr = {
      "x" : [140, 160, 215, 239],
      "y" : [-30, -10, 20, 20]
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
