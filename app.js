const express = require('express')
const cors = require('cors')

const middleware = require('./utils/middleware')
const rssRouter = require('./controllers/rss')
const confRouter = require('./controllers/conf')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

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
