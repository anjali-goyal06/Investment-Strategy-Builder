const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchUser')

const InvestmentStrategySkeleton = require('../Model/InvestmentStrategySkeleton');
const InvestmentStrategy = require('../Model/InvestmentStrategy');
const InstrumentSkeletonManager = require('../Model/InstrumentSkeletonManager');
const InstrumentManager = require('../Model/InstrumentManager');
const DbManager = require('../Model/DbManager');

/**
 * Inserts the strategy (with all the instruments and their values) in database by fetching values from request body.
 * 
 * Explanation-
 * Request Body has a variable 'isSkeletonSaved' in it. This variable governs whether strategy skeleton will be added or not in the database.
 * If isSkeletonSaved is true then skeleton is already in database. In this case, request body provides the necessary skeleton ids for strategy insertion.
 * If isSkeletonSaved is false then skeleton is not saved in database. In this case, skeleton is first inserted in database and then it's id is used for strategy insertion.
 *  
*/
router.post('/SaveStrategy' , fetchuser,async (req,res)=>{
 
    var userId = req.body.userId;
    
    var strategySkeletonId = req.body.InvestmentStrategySkeletonId;

    //If strategy skeleton is not in database, add it first
    if(!req.body.isSkeletonSaved){
      try{
        var investmentStrategySkeleton = await new InvestmentStrategySkeleton(-1, req.body.StrategyName, userId, req.body.DescriptionSkeleton);
        var result1 = await investmentStrategySkeleton.AddDataToDb();
        console.log(result1);
      }catch(err){
        console.log(err)
        return res.status(400).send("Got Stuck at investment strategy skeleton");
      }
      strategySkeletonId = await investmentStrategySkeleton.getId();
    }

    //Adding strategy in database
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


      //Loop for adding all the instruments of strategy in database
      for(var i=0; i<req.body.listInstruments.length; i++){

        var instrument = req.body.listInstruments[i];
        var instrumentSkeletonId = instrument.SkeletonId;
        
        //If instrument skeleton is not already added in database, add it first
        if(!req.body.isSkeletonSaved){
          try{
             //instrument skeleton manager returns the object of the appropriate instrument skeleton
            var instrumentSkeleton = await instrumentSkeletonManager.createInstrument(instrument.segment, instrument.Type, instrument.Side);
            var result2 = await instrumentSkeleton.AddDataToDb(strategySkeletonId);
          }catch(err){
            console.log(err);
            return res.status(400).send("Got stuck at instrument skeleton");
          }
          instrumentSkeletonId = await instrumentSkeleton.getId();
        }

        //Adding the instrument in database
        try{
           //instrument manager returns the object of the appropriate instrument
          var _instrument = await instrumentManager.createInstrument(instrument.segment, instrument.Quantity, instrument.StrikePrice, instrument.Price, instrument.Type, instrument.Side);
          var result4 = await _instrument.AddDataToDb(instrumentSkeletonId, strategyId);
          console.log(result4);
        }catch(err){
          console.log(err)
          return res.status(400).send("Got Stuck at instrument");
        }

    }

    console.log("Added!!!!");
    return res.send("Success!!!!");

})

/**
 * Inserts strategy skeleton in database (with all the instrument skeletons) by fetching values from request body
 * 
 */
router.post('/SaveStrategySkeleton' , fetchuser, async (req,res)=>{
 
    var userId = req.body.userId;

    //Adding Strategy Skeleton in database
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

    //Loop for adding all the instrument skeletons in database
    for(var i=0; i<req.body.listInstruments.length; i++){
        
      var instrument = req.body.listInstruments[i];
      try{
        //instrument skeleton manager returns the object of the appropriate instrument skeleton
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


