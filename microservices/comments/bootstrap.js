var _ = require('lodash')
var winston = require('winston')

var config = require('./config')
var localConfig

try {
  localConfig = require('./local')
} catch (err) {}

global.CONFIG = localConfig ? _.merge(config, localConfig) : config

var loggerTransports = [
  new (winston.transports.Console)({
    colorize: true,
    timestamp: true
  })
]

if (CONFIG.env === 'test') {
  loggerTransports = []
}

global.log = new (winston.Logger)({transports: loggerTransports})
