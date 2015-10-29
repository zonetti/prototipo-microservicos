var Post = require('./models').Post
var RPCClientFactory = require('./rpc_client_factory')

var rpcClient = RPCClientFactory(require('./index').rpc)

function errorHandler (friendlyMessage, err, callback) {
  log.error(friendlyMessage)
  callback({
    message: friendlyMessage,
    data: err.message
  })
}

function findById (params, callback) {
  Post.forge({app_id: params.app_id, id: params.id}).fetch().asCallback((err, post) => {
    if (err) return callback(err)
    if (!post) return callback(new Error('Publicação não encontrada.'))
    callback(err, post)
  })
}

module.exports.list = (params, callback) => {
  Post.collection().query({where: params}).fetch().asCallback((err, collection) => {
    if (err) return errorHandler('Erro ao retornar lista de publicações.', err, callback)
    var message = 'Publicações retornadas com sucesso.'
    log.info(message)
    callback(null, {
      message: message,
      data: collection.toJSON()
    })
  })
}

module.exports.create = (params, callback) => {
  Post.forge(params).save().asCallback((err, post) => {
    if (err) return errorHandler('Erro ao criar publicação.', err, callback)
    var message = 'Publicação criada com sucesso.'
    log.info(message)
    callback(null, {
      message: message,
      data: post.toJSON()
    })
  })
}

module.exports.read = (params, callback) => {
  findById({app_id: params.app_id, id: params.id}, (err, post) => {
    if (err) return errorHandler('Erro ao buscar publicação.', err, callback)
    post = post.toJSON()
    var conditions = {
      app_id: params.app_id,
      id: post.account_id
    }
    rpcClient('accounts-read', conditions, (err, success) => {
      if (err) return errorHandler('Erro ao atualizar publicação.', err, callback)
      post.account = success.data
      var message = 'Publicação retornada com sucesso.'
      log.info(message)
      callback(null, {
        message: message,
        data: post
      })
    })
  })
}

module.exports.update = (params, callback) => {
  function update () {
    Post.forge({app_id: params.app_id, id: params.id}).save(params, {patch: true})
      .asCallback((err, post) => {
        if (err) return errorHandler('Erro ao atualizar publicação.', err, callback)
        var message = 'Publicação atualizada com sucesso.'
        log.info(message)
        callback(null, {
          message: message,
          data: post.toJSON()
        })
      })
  }
  findById({app_id: params.app_id, id: params.id}, (err, post) => {
    if (err) return errorHandler('Erro ao atualizar publicação.', err, callback)
    update()
  })
}

module.exports.remove = (params, callback) => {
  function remove (post) {
    post.destroy().asCallback(err => {
      if (err) return errorHandler('Erro ao remover publicação.', err, callback)
      var message = 'Publicação removida com sucesso.'
      log.info(message)
      callback(null, {
        message: message
      })
    })
  }
  findById({app_id: params.app_id, id: params.id}, (err, post) => {
    if (err) return errorHandler('Erro ao remover publicação.', err, callback)
    remove(post)
  })
}
