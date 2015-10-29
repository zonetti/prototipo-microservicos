var _ = require('lodash')

var config = require('./config')
var localConfig

try {
  localConfig = require('./local')
} catch (err) {}

global.CONFIG = localConfig ? _.merge(config, localConfig) : config
