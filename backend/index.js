const express = require('express')
const app = express()
const port = process.env.PORT ||  8000
require('./db/dbconnect.js');
require('./db/createDatabase.js')
require('./db/tables/tables.js')

const DbManager = require('./Model/DbManager'); //Testing Purpose

//require('./db/InsertData/user.js')
//require('./db/RetrieveData/user.js')

const http = require('http')
const server = http.createServer(app)
var cors = require('cors') 
app.use(cors())
app.use(express.json())


// Available Routes
app.use('/api/auth', require('./routes/auth'))


//Testing Purpose
const Test = async () =>{
    var db = new DbManager()
    var result = await db.GetStrategySkeletonFromStrategyName('married put');
    console.log("ans...")
    console.log(result)
    console.log("ans end..")

}

Test()

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})