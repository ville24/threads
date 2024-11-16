const express = require('express')
const cors = require('cors')

const middleware = require('./utils/middleware')
const rssRouter = require('./controllers/rss')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(
  '/api/rss',
  rssRouter
)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
