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



router.get("/savedImplementation" , async (req,res) => {
    // var user = new User();
    var investmentStrategy = await new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategyImplementationFromDbForUser(3);
     res.send(response);
  })


  router.get("/savedSkeleton" , async (req,res) => {
    // var user = new User();
    var investmentStrategy = await new InvestmentStrategy();
    var response = await investmentStrategy.fetchDetailedStrategySkeletonFromDbForUser(3);
    res.send(response);
  })

  module.exports = router