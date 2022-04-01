const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const InvestmentStrategy = require('../Model/InvestmentStrategy');
const DbManager = require('../Model/DbManager');


 /**
  * Purpose - Given a strategy id, it fetches its implementation 
  * @returns strategy details and list of all the instruments it has as response in json format
  */
router.get("/savedImplementation" , async (req,res) => {
    // var user = new User();
    var investmentStrategy = await new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategyImplementationFromDbForUser(3);
     res.send(response);
  })

  /**
   * Purpose - Fetches the complete strategy skeleton (with instrument skeletons) of given strategy skeleton id
   * @returns strategy skeleton details and list of all the instrument skeletons it has as response
   */
  router.post("/savedSkeleton" , async (req,res) => {
    console.log("call..")
    var skeletonId = (req.body.skeletonId) ? req.body.skeletonId : 5;
    var investmentStrategy = await new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategySkeletonFromDbForUser(skeletonId);
    res.send(response);
  })

   /**
   * Purpose - Fetches the skeletons of popular strategies from database i.e. the strategies saved by system user
   * @returns strategy skeleton records as response
   */
  router.get("/popularStrategy" , async(req,res) =>{
    userId = 1;
    var db = await new DbManager();
    var popularStrategies = await db.GetStrategySkeletonsFromUserId(userId);
    res.send(popularStrategies);
  })

  /**
   * Purpose - Fetches the strategy skeletons saved by a particular user from database
   * @returns strategy skeleton records as response
   */
  router.get("/customStrategy" , async(req,res) =>{
    var userId = 2;
    var db = await new DbManager();
    var customStrategies = await db.GetStrategySkeletonsFromUserId(userId);
    res.send(customStrategies);
  })


  /**
   * Purpose - Fetches all the strategies (with values) that are saved by a given user
   * @returns fetched strategies as response
   */
  router.get("/allSavedImplemenations" , async (req,res) =>{
      var userId = 2;
      var db = await new DbManager();
      var response = await db.GetSavedStrategiesFromUserId(userId);
      return res.send(response);

  })
  module.exports = router