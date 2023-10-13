const express = require("express")

require('dotenv').config()

require ('./db/connection')

const server = express()

const cors = require ('cors')

const router = require("./routes/router")

server.use(cors())
server.use(express.json())
server.use(router)

const port = 4000 || process.env.port

server.use('/uploads',express.static("./uploads"))

server.listen(port, () => {
    console.log(`musetale Server started at port ${port}`);
})