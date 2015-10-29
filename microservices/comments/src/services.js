var async = require('async')
var Comment = require('./models').Comment
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
  Comment.forge({app_id: params.app_id, id: params.id}).fetch().asCallback((err, comment) => {
    if (err) return callback(err)
    if (!comment) return callback(new Error('Comentário não encontrado.'))
    callback(err, comment)
  })
}

module.exports.listByArtifactId = (params, callback) => {
  function listByArtifactId (collection) {
    async.map(
      collection.toJSON(),
      (comment, next) => {
        var conditions = {
          app_id: params.app_id,
          id: comment.account_id
        }
        rpcClient('accounts-read', conditions, (err, success) => {
          if (err) return next(err)
          comment.account = success.data
          next(null, comment)
        })
      },
      (err, comments) => {
        if (err) return errorHandler('Erro ao retornar lista de comentários.', err, callback)
        var message = 'Comentários retornados com sucesso.'
        log.info(message)
        callback(null, {
          message: message,
          data: comments
        })
      }
    )
  }
  var filter = {
    app_id: params.app_id,
    artifact_id: params.artifact_id
  }
  Comment.collection().query({where: filter}).fetch().asCallback((err, collection) => {
    if (err) return errorHandler('Erro ao retornar lista de contas.', err, callback)
    listByArtifactId(collection)
  })
}

module.exports.create = (params, callback) => {
  Comment.forge(params).save().asCallback((err, comment) => {
    if (err) return errorHandler('Erro ao criar comentário.', err, callback)
    var message = 'Comentário criado com sucesso.'
    log.info(message)
    callback(null, {
      message: message,
      data: comment.toJSON()
    })
  })
}

module.exports.remove = (params, callback) => {
  function remove (comment) {
    comment.destroy().asCallback(err => {
      if (err) return errorHandler('Erro ao remover comentário.', err, callback)
      var message = 'Comentário removido com sucesso.'
      log.info(message)
      callback(null, {
        message: message
      })
    })
  }
  findById({app_id: params.app_id, id: params.id}, (err, comment) => {
    if (err) return errorHandler('Erro ao remover comentário.', err, callback)
    remove(comment)
  })
}
