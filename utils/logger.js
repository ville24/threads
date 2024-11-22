const winston = require('winston')
const {LoggingWinston} = require('@google-cloud/logging-winston')

const loggingWinston = new LoggingWinston()

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {

  module.exports = winston.createLogger({
    transports:
        new winston.transports.File({filename: 'logs/server.log',
          format: winston.format.combine(
            winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            winston.format.align(),
            winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
          )})
  })

} else {

  module.exports = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
      winston.format.align(),
      winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
    transports: [
      new winston.transports.Console(),
      loggingWinston
    ]
  })

}
