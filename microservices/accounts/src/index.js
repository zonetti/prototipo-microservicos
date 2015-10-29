var rpc = require('amqp-rpc').factory({url: CONFIG.amqp})

var services = require('./services')

rpc.on('accounts-login', services.login)
rpc.on('accounts-create', services.create)
rpc.on('accounts-update', services.update)
rpc.on('accounts-read', services.read)
rpc.on('accounts-list', services.list)
rpc.on('accounts-remove', services.remove)

log.info('Provedor "accounts" iniciado!')
log.info('Ambiente: ' + CONFIG.env)
