var rpc = module.exports.rpc = require('amqp-rpc').factory({url: CONFIG.amqp})

var services = require('./services')

rpc.on('posts-create', services.create)
rpc.on('posts-update', services.update)
rpc.on('posts-read', services.read)
rpc.on('posts-list', services.list)
rpc.on('posts-remove', services.remove)

log.info('Provedor "posts" iniciado!')
log.info('Ambiente: ' + CONFIG.env)
