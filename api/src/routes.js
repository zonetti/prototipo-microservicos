var express = require('express')
var router = module.exports = express.Router()
var RPCClientFactory = require('./rpc_client_factory')
var rpc = require('amqp-rpc').factory({url: CONFIG.amqp})
var rpcClient = RPCClientFactory(rpc)

function serviceRouteFactory (serviceName) {
  return (req, res, next) => {
    var params = ['GET', 'DELETE'].indexOf(req.method) !== -1 ? req.query : req.body
    if (req.params.id) {
      params.id = req.params.id
    }
    rpcClient(serviceName, params, (err, success) => {
      if (err) return next(err)
      res.send(success)
    })
  }
}

router.get('/accounts', serviceRouteFactory('accounts-list'))
router.post('/accounts', serviceRouteFactory('accounts-create'))
router.get('/accounts/:id', serviceRouteFactory('accounts-read'))
router.put('/accounts/:id', serviceRouteFactory('accounts-update'))
router.delete('/accounts/:id', serviceRouteFactory('accounts-remove'))
router.post('/accounts/login', serviceRouteFactory('accounts-login'))

router.get('/posts', serviceRouteFactory('posts-list'))
router.post('/posts', serviceRouteFactory('posts-create'))
router.get('/posts/:id', serviceRouteFactory('posts-read'))
router.put('/posts/:id', serviceRouteFactory('posts-update'))
router.delete('/posts/:id', serviceRouteFactory('posts-remove'))

router.get('/comments', serviceRouteFactory('comments-list-by-artifact-id'))
router.post('/comments', serviceRouteFactory('comments-create'))
router.delete('/comments/:id', serviceRouteFactory('comments-remove'))
