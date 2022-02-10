const express = require('express')
const app = express()
const port = process.env.PORT ||  8000
require('./db.js');

const http = require('http')
const server = http.createServer(app)

server.listen(port,()=>console.log('server running at port = '+port))
