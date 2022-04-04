const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchUser')

const InvestmentStrategy = require('../Model/InvestmentStrategy');
const InstrumentManager = require('../Model/InstrumentManager')


/**
 * Making the plot for the investment strategy whose details are provided in the request body.
 * It also calculates the starting x coordinate for the combined plot.
 * @returns the combined plot, basically x & y coordinates of the plot as response
 */
router.post('/',async(req, res)=>{
 
     //Creating investment strategy object
    var investmentStrategy = await new InvestmentStrategy(-1, req.body.StockName, req.body.Ticker, -1, req.body.ExpiryDate, req.body.Name, -1, req.body.Description);
    var instrumentManager = await new InstrumentManager();
    //console.log(req.body.instruments);

    let sum = 0;
    for(var i=0; i<req.body.listInstruments.length; i++){
      var instrument = req.body.listInstruments[i];

      if(instrument.segment.toLowerCase() == "option"){
      
       sum = sum + parseInt(instrument.StrikePrice);
       // console.log("strile = " + instrument.StrikePrice)
      }else{
       // if(!instrument.Price) instrument.Price = instrument.StrikePrice
      sum = sum + parseInt(instrument.Price);
       // console.log("strile = " + instrument.Price)
      }
  
      //creating appropriate instrument object using instrument manager and adding to investment strategy object
      var _instrument = await instrumentManager.createInstrument(instrument.segment, instrument.Quantity, instrument.StrikePrice, instrument.Price, instrument.Type, instrument.Side, instrument.Premium);
      //console.log(investmentStrategy.instruments)
      investmentStrategy.instruments.push(_instrument);
    }

    //var range = 100;
  
    console.log(sum)
    let total = req.body.listInstruments.length;
    console.log(total)
    let t = Math.floor(total);
  
   //setting the starting x coordinate of combined plot
    let average = Math.floor(sum/t);

    let range = 2*average;
    if(range > 400) range = 400;


    let startCoord = average - (range/2);
    console.log(startCoord)
    startCoord = Math.floor(startCoord);
    range = Math.floor(range);

    if(startCoord<0) startCoord = 0;
    console.log("startcoords = " + startCoord);
    console.log("range = " + range);

    //Making the combined plot
    var plot = await investmentStrategy.combinedPlot(startCoord, range);
  
    var response = plot
    console.log(response)
    res.send(response);
  
  });


  module.exports = router

  // ) 1651363200000 1648666418777