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
const DbManager = require('../Model/DbManager');


// For a particular strategy, its fetch its impementation
router.get("/savedImplementation" , async (req,res) => {
    // var user = new User();
    var investmentStrategy = await new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategyImplementationFromDbForUser(3);
     res.send(response);
  })


  router.post("/savedSkeleton" , async (req,res) => {
    console.log("call..")
    var skeletonId = (req.body.skeletonId) ? req.body.skeletonId : 5;
    var investmentStrategy = await new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategySkeletonFromDbForUser(skeletonId);
    res.send(response);
  })

  router.get("/popularStrategy" , fetchuser,async(req,res) =>{
    userId = 1;
    var db = await new DbManager();
    var popularStrategies = await db.GetStrategySkeletonsFromUserId(userId);
    res.send(popularStrategies);
  })

  router.get("/customStrategy" ,fetchuser, async(req,res) =>{
    var userId = req.body.userId;
    var db = await new DbManager();
    var customStrategies = await db.GetStrategySkeletonsFromUserId(userId);
    res.send(customStrategies);
  })

  router.get("/allSavedImplemenations" ,fetchuser, async (req,res) =>{
      var userId = req.body.userId;
      var db = await new DbManager();
      var response = await db.GetSavedStrategiesFromUserId(userId);
      return res.send(response);

  })
  module.exports = router