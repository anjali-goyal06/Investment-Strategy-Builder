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



router.post('/MakePlot', async(req, res)=>{
  
    var investmentStrategy = await new InvestmentStrategy(-1, req.body.stockName, req.body.ticker, -1, req.body.expiryDate, req.body.name, -1, req.body.descriptionStrategy);
    var InstrumentManager = await new InstrumentManager();
    for(var i=0; i<req.body.instruments.length; i++){
      var instrument = req.body.instruments[i];
      const Instrument = await InstrumentManager.createInstrument(instrument.segment, instrument.quantity, instrument.strikePrice, instrument.price, instrument.type, instrument.side);
      await investmentStrategy.instruments.push(Instrument);
    }
  
    await investmentStrategy.combinedPlot();
    var plot = await investmentStrategy.getPlot();
    var response;
    response.x = plot.xCoords;
    response.y = plot.yCoords;
    
    res.send(response);
  
  });


  

router.post('/SaveStrategy' , async (req,res)=>{
 
    //const errors = validationResult(req);
    //if (!errors.isEmpty()) {
      //return res.status(400).json({ errors: errors.array() });
   // }
      var userId = 1;
  
      var strategySkeletonId = req.body.strategySkeletonId;
      if(!req.body.isSkeletonSaved){
        try{
          var investmentStrategySkeleton = await new InvestmentStrategySkeleton(-1, req.body.strategyName, userId, req.body.descriptionSkeleton);
          var result1 = await investmentStrategySkeleton.AddDataToDb();
          console.log(result1);
        }catch(err){
          console.log(err)
          res.status(400).send("Got Stuck at investment strategy skeleton");
        }
        strategySkeletonId = investmentStrategySkeleton.getId();
      }
  
  
        try{
          var investmentStrategy = await new InvestmentStrategy(-1, req.body.stockName, req.body.ticker, userId, req.body.expiryDate, req.body.name, strategySkeletonId, req.body.descriptionStrategy);
          var result2 = await investmentStrategy.AddDataToDb();
          console.log(result2);
        }catch(err){
          console.log(err)
          res.status(400).send("Got Stuck at investment strategy");
        }
      
        var strategyId = investmentStrategy.getId();
  
        for(var i=0; i<req.body.instruments.length; i++){
          var instrument = req.body.instruments[i];
          var skeletonId = instrument.skeletonId;
            switch(req.body.instruments[i].segment){   
              case "option": { 
                                
                                if(!req.body.isSkeletonSaved){
                                  try{
                                    var optionSkeleton = await new OptionSkeleton(-1, instrument.side, instrument.type, strategySkeletonId);
                                    var result3 = await optionSkeleton.AddDataToDb();
                                  }catch(err){
                                    console.log(err)
                                    res.status(400).send("Got Stuck at option skeleton");
                                  }
                                  skeletonId = optionSkeleton.getId();
                                }
  
                              try{
                                var option = await new Options(-1, instrument.quantity , instrument.strikePrice, skeletonId, strategyId, instrument.type, instrument.side);
                                var result4 = await option.AddDataToDb();
                              }catch(err){
                                console.log(err)
                                res.status(400).send("Got Stuck at option");
                              }
  
                              break;
                              }
    
              case "future": {   
                
                                if(!req.body.isSkeletonSaved){
                                  try{
                                    var futureSkeleton = await new FutureSkeleton(-1, instrument.side, strategySkeletonId);
                                    var result5 = await futureSkeleton.AddDataToDb();
                                  }catch(err){
                                    console.log(err)
                                    res.status(400).send("Got Stuck at future skeleton");
                                  }
                                  skeletonId = futureSkeleton.getId();
                                }
                                
                                try{
                                  var future = await new Future(-1, instrument.quantity , instrument.price, skeletonId, strategyId, instrument.side);
                                  var result6 = await future.AddDataToDb();
                                }catch(err){
                                  console.log(err)
                                  res.status(400).send("Got Stuck at future");
                                }
                              break;
                            }
              case "stock": { 
                              if(!req.body.isSkeletonSaved){
                                try{
                                  var stockSkeleton = await new StockSkeleton(-1, instrument.side, strategySkeletonId);
                                  var result7 = await stockSkeleton.AddDataToDb();
                                }catch(err){
                                  console.log(err)
                                  res.status(400).send("Got Stuck at stock skeleton");
                                }
                                skeletonId = stockSkeleton.getId();
                              }
                              
                              try{
                                var stock = await new Stock(-1, instrument.quantity , instrument.price, skeletonId, strategyId, instrument.side);
                                var result8 = await stock.AddDataToDb();
                              }catch(err){
                                console.log(err)
                                res.status(400).send("Got Stuck at stock");
                              }
                              break;            
                            }
            }
        }
  
      console.log("ans...")
      console.log("Added!!!!")
      console.log("ans end..")
      return res.send("Success!!!!");
  
  })
  
  //saving strategy skeleton
  router.post('/SaveStrategySkeleton' , async (req,res)=>{
   
    //const errors = validationResult(req);
    //if (!errors.isEmpty()) {
      //return res.status(400).json({ errors: errors.array() });
   // }
      var userId = 1;
  
      try{
        var investmentStrategySkeleton = await new InvestmentStrategySkeleton(-1, req.body.name, userId, req.body.desc);
        var result1 = await investmentStrategySkeleton.AddDataToDb();
        console.log(result1);
      }catch(err){
        console.log(err);
        res.status(400).json({ errors: errors.array() });
      }
    
      var strategySkeletonId = investmentStrategySkeleton.getId();
  
      for(var i=0; i<req.body.instruments.length; i++){
          switch(req.body.instruments[i][0]){
            case "Option": { try{
                              var optionSkeleton = await new OptionSkeleton(-1, req.body.instruments[i][1], req.body.instruments[i][2], strategySkeletonId);
                              var result2 = await optionSkeleton.AddDataToDb();
                             }catch(err){
                              //console.log(err);
                              res.status(400).json({ errors: errors.array() });
                            }
                            break;
                            }
  
            case "Future": { try{
                              var futureSkeleton = await new FutureSkeleton(-1, req.body.instruments[i][1], strategySkeletonId);
                              var result3 = await futureSkeleton.AddDataToDb();
                            }catch(err){
                              //console.log(err)
                              res.status(400).json({ errors: errors.array() });
                            }
                            break;
                          }
            case "Stock": {  try{
                              var stockSkeleton = await new StockSkeleton(-1, req.body.instruments[i][1], strategySkeletonId);
                              var result4 = await stockSkeleton.AddDataToDb();
                            }catch(err){
                             // console.log(err);
                              res.status(400).json({ errors: errors.array() });
                            }
                            break;            
                          }
          }
      }
  
      console.log("ans...")
      console.log("Added!!!!")
      console.log("ans end..")
      return res.send("Success!!!!");
  
  })

  module.exports = router