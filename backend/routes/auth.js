const express = require('express');
const router = express.Router();
var connection = require('../db/dbconnect');

router.get('/' , (req,res)=>{
    console.log("Hello World||");
    res.send("hello!!");
})

// register a new user
router.post('/register' , async (req, res) => {
    var sql = "INSERT INTO user (name,id) VALUES (?,?)";
   
    var user = {
        name : req.body.name,
        id : req.body.id
    }
    console.log(user);

    connection.query(sql, [user.name , user.id], function (err, result) {
    if (err) console.log("duplicate rows " + err.message);
    else{
        console.log("user created");
        console.log(result);
        res.send("done");
       // console.log("Number of records inserted: " + result.affectedRows);
    }
    });

})

module.exports = router