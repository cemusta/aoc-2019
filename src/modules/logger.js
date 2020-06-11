const winston = require('winston')

const logFormat = winston.format.printf(function (info) {
  return `${new Date().toISOString()}-${info.level}: ${info.message}`
})

const consoleTransport = new winston.transports.Console({
  name: 'console.log',
  format: winston.format.combine(winston.format.colorize(), logFormat),
  handleExceptions: true,
  silent: process.env.SILENT_LOGS === 'true' // disable logs on test runner
})
const myWinstonOptions = {
  transports: [consoleTransport],
  exitOnError: false
}
// eslint-disable-next-line new-cap
const logger = new winston.createLogger(myWinstonOptions)

module.exports = {
  logger
}
