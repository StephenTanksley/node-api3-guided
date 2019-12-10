const express = require("express")
//additional headers.
const logger = require('./middleware/logger')
const helmet = require('helmet')
const agent = require('./middleware/agent')
//request logging.npm 
// const morgan = require('morgan')

const hubRouter = require("./routers/hub")
const welcomeRouter = require("./routers/welcome")

const server = express()
server.use(logger("long"))
server.use(agent("insomnia"))
// server.use(morgan("short"))
server.use(helmet())
server.use(express.json())


// Bring all our subroutes into the main application
// (Remember, subroutes can have more children routers)
server.use("/", welcomeRouter)
server.use("/api/hubs", hubRouter)

server.use((req, res) => {
  res
    .status(404)
    .json({
      message: "Route was not found",
    })
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "An internal error occurred"
  })
})

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n")
})
