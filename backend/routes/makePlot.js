const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');

const InvestmentStrategy = require('../Model/InvestmentStrategy');
const InstrumentManager = require('../Model/InstrumentManager')


/**
 * Purpose - Making the plot for the investment strategy whose details are provided in the request body.
 * It also calculates the starting x coordinate for the combined plot.
 * @returns the combined plot, basically x & y coordinates of the plot as response
 */
router.post('/', async(req, res)=>{

    console.log(req.body);

    //Creating investment strategy object
    var investmentStrategy = await new InvestmentStrategy(-1, req.body.StockName, req.body.Ticker, -1, req.body.ExpiryDate, req.body.Name, -1, req.body.Description);
    var instrumentManager = await new InstrumentManager();
    //console.log(req.body.instruments);

    var startCoord = 0;
    for(var i=0; i<req.body.listInstruments.length; i++){
      var instrument = req.body.listInstruments[i];

      if(instrument.segment == "option"){
        startCoord += instrument.StrikePrice;
      }else{
        startCoord += instrument.Price;
      }
  
      //creating appropriate instrument object using instrument manager and adding to investment strategy object
      var _instrument = await instrumentManager.createInstrument(instrument.segment, instrument.Quantity, instrument.StrikePrice, instrument.Price, instrument.Type, instrument.Side);
      //console.log(investmentStrategy.instruments)
      investmentStrategy.instruments.push(_instrument);
    }

    var range = 100;

    var total = req.body.listInstruments.length;

    //setting the starting x coordinate of combined plot
    startCoord /= total;
    startCoord -= (range/2);

    //Making the combined plot
    var plot = await investmentStrategy.combinedPlot(startCoord);
  
    var response = plot
    console.log(response)
    res.send(response);
  
  });


  module.exports = router