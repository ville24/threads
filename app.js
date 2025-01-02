const express = require('express')
const cors = require('cors')
const path = require('path')

const middleware = require('./utils/middleware')
const rssRouter = require('./controllers/rss')
const confRouter = require('./controllers/conf')

const app = express()

app.use(cors())
app.use(express.static(path.join(
  __dirname,
  'dist'
)))
app.use(express.json())
app.use(middleware.requestLogger)

app.get(
  '/version',
  (req, res) => {

    res.send('2')

  }
)

app.get(
  '/health',
  (req, res) => {

    res.send('ok')

  }
)

app.use(
  '/api/conf',
  confRouter
)

app.use(
  '/api/rss',
  rssRouter
)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
