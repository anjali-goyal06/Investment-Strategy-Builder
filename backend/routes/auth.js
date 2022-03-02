const express = require('express');
const router = express.Router();
var connection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const UserRepository = require('../Repository/UserRepository');

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

    id = Math.floor(Math.random() * (10000000));
    name = req.body.name;
    email = req.body.email;
    

    // passing hashing 
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);
    
    var user = {id,name,email,secPass}
    var userRepository = new UserRepository(user);
    var result = await userRepository.AddUser();
    console.log("ans...")
    console.log(result)
    console.log("ans end..")
    return res.send(result);

})


//  Authenticate a User 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    

    try{

        const { email, password } = req.body;
        
      
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  
  
  });

module.exports = router