var rpc = module.exports.rpc = require('amqp-rpc').factory({url: CONFIG.amqp})

var services = require('./services')

rpc.on('comments-create', services.create)
rpc.on('comments-list-by-artifact-id', services.listByArtifactId)
rpc.on('comments-remove', services.remove)

log.info('Provedor "comments" iniciado!')
log.info('Ambiente: ' + CONFIG.env)
