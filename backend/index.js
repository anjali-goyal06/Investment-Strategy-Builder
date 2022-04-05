const express = require('express')
const app = express()
const port = process.env.PORT ||  8000
require('./db/dbconnect.js');
//require('./db/createDatabase.js')
require('./db/tables/tables.js')

const DbManager = require('./model/DbManager'); //Testing Purpose

//require('./db/InsertData/user.js')
//require('./db/RetrieveData/user.js')

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const http = require('http')
const server = http.createServer(app)
var cors = require('cors') 
app.use(cors())
app.use(express.json())


// Available Routes//
app.use('/api/auth', require('./routes/auth'));
app.use('/api/save', require('./routes/saveData'));
app.use('/api/makePlot', require('./routes/makePlot'));
app.use('/api/send', require('./routes/sendData'));


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})