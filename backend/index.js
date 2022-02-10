const express = require('express')
const app = express()
const port = process.env.PORT ||  8000
//require('./db/dbconnect.js');
require('./db/createDatabase.js')
require('./db/tables/user.js')
//require('./db/InsertData/user.js')
require('./db/RetrieveData/user.js')

const http = require('http')
const server = http.createServer(app)
var cors = require('cors') 
app.use(cors())
app.use(express.json())


// Available Routes
//app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})