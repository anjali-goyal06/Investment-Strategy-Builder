const express = require('express');
const router = express.Router();
var connection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mysql = require('mysql')

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

    var sql = "INSERT INTO user (id,name,email,password) VALUES (?,?,?,?)";
   
    var {
        name,
        email,
        password
    } = req.body;
    
    id = 56718;

    // passing hashing 
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    connection.query(sql, [id , name , email , secPass], function (err, result) {
    if (err) console.log("duplicate rows " + err.message);
    else{
        console.log("user created successfully !!");
        console.log(result);
        res.send("done");
    }
    });

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
        
        var sql = "Select  * from user where email = " + mysql.escape(email);

        connection.query(sql, async function (err, result) {
            if (err) console.log(err.message);
            else{

                // find noumber of results get
                var cnt = Object.keys(result).length; 
                
                
                if(cnt==0){ 
                    return res.status(400).json({ success, error: "Please try to login with correct credentials" });
                }
                
                // password matching 
                const passwordCompare = await bcrypt.compare(password, result[0].password);
                if (!passwordCompare) {
                    success = false
                    return res.status(400).json({ success, error: "Please try to login with correct credentials" });
                }
                console.log(result);
                return res.send(result);
            }
            });
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  
  
  });

module.exports = router