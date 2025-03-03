const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controller/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

logger.info("Connecting to database")

mongoose.connect(config.MONGO)
  .then(() => {
    logger.info('Success!')
  })
  .catch((error) => {
    logger.info('Failed', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app