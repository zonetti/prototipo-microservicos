var Account = require('./models').Account

function errorHandler (friendlyMessage, err, callback) {
  log.error(friendlyMessage)
  callback({
    message: friendlyMessage,
    data: err.message
  })
}

function findById (params, callback) {
  Account.forge({app_id: params.app_id, id: params.id}).fetch().asCallback((err, account) => {
    if (err) return callback(err)
    if (!account) return callback(new Error('Conta não encontrada.'))
    callback(err, account)
  })
}

module.exports.login = (params, callback) => {
  function loginFailed () {
    return errorHandler(
      'Erro ao verificar login.',
      new Error('Usuário ou senha incorretos.'),
      callback
    )
  }
  var filter = {
    app_id: params.app_id,
    username: params.username
  }
  Account.forge(filter).fetch().asCallback((err, account) => {
    if (err) return errorHandler('Erro ao verificar login.', err, callback)
    if (!account || account.get('password') !== params.password) return loginFailed()
    var message = 'Login verificado com sucesso.'
    callback(null, {
      message: message,
      data: account.toJSON()
    })
  })
}

module.exports.list = (params, callback) => {
  Account.collection().query({where: params}).fetch().asCallback((err, collection) => {
    if (err) return errorHandler('Erro ao retornar lista de contas.', err, callback)
    var message = 'Contas retornadas com sucesso.'
    log.info(message)
    callback(null, {
      message: message,
      data: collection.toJSON()
    })
  })
}

module.exports.create = (params, callback) => {
  Account.forge(params).save().asCallback((err, account) => {
    if (err) return errorHandler('Erro ao criar conta.', err, callback)
    var message = 'Conta criada com sucesso.'
    log.info(message)
    callback(null, {
      message: message,
      data: account.toJSON()
    })
  })
}

module.exports.read = (params, callback) => {
  findById({app_id: params.app_id, id: params.id}, (err, account) => {
    if (err) return errorHandler('Erro ao buscar conta.', err, callback)
    var message = 'Conta retornada com sucesso.'
    log.info(message)
    callback(null, {
      message: message,
      data: account.toJSON()
    })
  })
}

module.exports.update = (params, callback) => {
  function update () {
    Account.forge({app_id: params.app_id, id: params.id}).save(params, {patch: true})
      .asCallback((err, account) => {
        if (err) return errorHandler('Erro ao atualizar conta.', err, callback)
        var message = 'Conta atualizada com sucesso.'
        log.info(message)
        callback(null, {
          message: message,
          data: account.toJSON()
        })
      })
  }
  findById({app_id: params.app_id, id: params.id}, (err, account) => {
    if (err) return errorHandler('Erro ao atualizar conta.', err, callback)
    update()
  })
}

module.exports.remove = (params, callback) => {
  function remove (account) {
    account.destroy().asCallback(err => {
      if (err) return errorHandler('Erro ao remover conta.', err, callback)
      var message = 'Conta removida com sucesso.'
      log.info(message)
      callback(null, {
        message: message
      })
    })
  }
  findById({app_id: params.app_id, id: params.id}, (err, account) => {
    if (err) return errorHandler('Erro ao remover conta.', err, callback)
    remove(account)
  })
}
