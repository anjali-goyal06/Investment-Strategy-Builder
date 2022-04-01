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


router.get('/' , (req,res)=>{
    console.log("Hello World||");
    res.send("hello!!");
})



// register a new user
router.post('/register' ,[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {

    // error validation using express-validation
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    

    var user = await new User(-1, req.body.name,req.body.email,req.body.password);
    var result = await user.AddUser();
  
    console.log(result)
   
    return res.send(result);

})


//  Authenticate a User 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and the errors
   console.log(req.body)
 //  console.log(req.body.email.isEmail())
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    

    try{

        const user = req.body;
        var newuser = new User(user.id,user.name,user.email,user.password);
        var result = await newuser.LoginUser() ;
        if(!result.error)
              return res.status(200).send("Login succesful !!");
        else
              return res.status(400).send(result.error)
      
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  
  });

module.exports = router