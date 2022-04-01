const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchUser')

const User = require('../Model/User');
const InvestmentStrategySkeleton = require('../Model/InvestmentStrategySkeleton');
const InvestmentStrategy = require('../Model/InvestmentStrategy');
const OptionSkeleton = require('../Model/OptionSkeleton');
const Options = require('../Model/Options');
const FutureSkeleton = require('../Model/FutureSkeleton');
const Future = require('../Model/Future');
const StockSkeleton = require('../Model/StockSkeleton');
const Stock = require('../Model/Stock');
const IInstrumentSkeleton = require('../Model/IInstrumentSkeleton');
const InstrumentSkeletonManager = require('../Model/InstrumentSkeletonManager');
const InstrumentManager = require('../Model/InstrumentManager');


router.post('/SaveStrategy' ,fetchuser, async (req,res)=>{
 
    var userId = req.body.userId;

    
    console.log(req.body);
    console.log(req.body.listInstruments);
    req.body.isSkeletonSaved = true;
    req.body.Description = " ";
    req.body.InvestmentStrategySkeletonId = 3;

    var strategySkeletonId = req.body.InvestmentStrategySkeletonId;
    if(!req.body.isSkeletonSaved){
      try{
        var investmentStrategySkeleton = await new InvestmentStrategySkeleton(-1, req.body.StrategyName, userId, req.body.DescriptionSkeleton);
        var result1 = await investmentStrategySkeleton.AddDataToDb();
        console.log(result1);
        res.status(200).send("Saved Successfully");
      }catch(err){
        console.log(err)
        return res.status(400).send("Got Stuck at investment strategy skeleton");
      }
      strategySkeletonId = investmentStrategySkeleton.getId();
    }


    try{
      var investmentStrategy = await new InvestmentStrategy(-1, req.body.StockName, req.body.Ticker, userId, req.body.ExpiryDate, req.body.Name, strategySkeletonId, req.body.Description);
      var result2 = await investmentStrategy.AddDataToDb();
      console.log(result2);
    }catch(err){
      console.log(err)
      return res.status(400).send("Got Stuck at investment strategy");
    }
  
    var strategyId = investmentStrategy.getId();

    var instrumentSkeletonManager = await new InstrumentSkeletonManager();
    var instrumentManager = await new InstrumentManager();

      for(var i=0; i<req.body.listInstruments.length; i++){

        var instrument = req.body.listInstruments[i];
        var instrumentSkeletonId = instrument.SkeletonId;

        if(!req.body.isSkeletonSaved){
          try{
            var instrumentSkeleton = await instrumentSkeletonManager.createInstrument(instrument.segment, instrument.Type, instrument.Side);
            var result2 = await instrumentSkeleton.AddDataToDb(strategySkeletonId);
          }catch(err){
            console.log(err);
            return res.status(400).send("Got stuck at instrument skeleton");
          }
          instrumentSkeletonId = instrumentSkeleton.getId();
        }

        try{
          var _instrument = await instrumentManager.createInstrument(instrument.segment, instrument.Quantity, instrument.StrikePrice, instrument.Price, instrument.Type, instrument.Side);
          var result4 = await _instrument.AddDataToDb(instrumentSkeletonId, strategyId);
          
          console.log("Added!!!!")
          return res.send("Success!!!!");
        }catch(err){
          console.log(err)
          return res.status(400).send("Got Stuck at instrument");
        }

    }

})

//saving strategy skeleton
router.post('/SaveStrategySkeleton' , fetchuser,async (req,res)=>{
 
    var userId = req.body.userId;

    try{
      var investmentStrategySkeleton = await new InvestmentStrategySkeleton(-1, req.body.StrategyName, userId, req.body.DescriptionSkeleton);
      var result1 = await investmentStrategySkeleton.AddDataToDb();
      console.log(result1);
    }catch(err){
      console.log(err);
      return res.status(400).send("Got stuck at investment strategy skeleton");
    }
  
    var strategySkeletonId = investmentStrategySkeleton.getId();
    var instrumentSkeletonManager = await new InstrumentSkeletonManager();

    for(var i=0; i<req.body.listInstruments.length; i++){
        
      var instrument = req.body.listInstruments[i];
      try{
        var _instrument = await instrumentSkeletonManager.createInstrument(instrument.segment, instrument.Type, instrument.Side);
        var result2 = await _instrument.AddDataToDb(strategySkeletonId);
      }catch(err){
        console.log(err);
        return res.status(400).send("Got stuck at instrument");
      }       
    }

    
    console.log("Added!!!!")
    return res.send("Success!!!!");

})

module.exports = router


