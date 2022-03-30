const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../Model/User');
const InvestmentStrategySkeleton = require('../Model/InvestmentStrategySkeleton');
const InvestmentStrategy = require('../Model/InvestmentStrategy');
const OptionSkeleton = require('../Model/OptionSkeleton');
const Options = require('../Model/Options');
const FutureSkeleton = require('../Model/FutureSkeleton');
const Future = require('../Model/Future');
const StockSkeleton = require('../Model/StockSkeleton');
const Stock = require('../Model/Stock');
const InstrumentManager = require('../Model/InstrumentManager');



router.post('/', async(req, res)=>{

  console.log(req.body);
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
  
      var _instrument = await instrumentManager.createInstrument(instrument.segment, instrument.Quantity, instrument.StrikePrice, instrument.Price, instrument.Type, instrument.Side);
      //console.log(investmentStrategy.instruments)
      investmentStrategy.instruments.push(_instrument);
    }

    var range = 100;

    var total = req.body.listInstruments.length;
    startCoord /= total;
    startCoord -= (range/2);
    startCoord = Math.floor(startCoord);

    if(startCoord<0) startCoord = 0;
    console.log("startcoords = " + startCoord)

    var plot = await investmentStrategy.combinedPlot(startCoord);
  
    var response = plot
    console.log(response)
    res.send(response);
  
  });


  module.exports = router

  // ) 1651363200000 1648666418777