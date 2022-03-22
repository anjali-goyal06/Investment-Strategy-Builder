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
const DbManager = require('../Model/DbManager');



router.get("/savedImplementation" , async (req,res) => {
    // var user = new User();
    var investmentStrategy = await new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategyImplementationFromDbForUser(3);
     res.send(response);
  })


  router.get("/savedSkeleton" , async (req,res) => {
    // var user = new User();
    var investmentStrategy = await new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategySkeletonFromDbForUser(5);
    res.send(response);
  })

  router.get("/popularStrategy" , async(req,res) =>{
    var db = await new DbManager();
    var popularStrategies = await db.GetStrategySkeletonsFromUserId(1);
    res.send(popularStrategies);
  })

  router.get("/customStrategy" , async(req,res) =>{
    var userId = 2;
    var db = await new DbManager();
    var customStrategies = await db.GetStrategySkeletonsFromUserId(userId);
    res.send(customStrategies);
  })

  module.exports = router