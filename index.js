const http = require('http')

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = process.env.PORT || config.PORT
server.listen(
  PORT,
  () => {

    // console.log(`Server running on port ${PORT}`)
    logger.info(`Server running on port ${PORT}`)

  }
)
