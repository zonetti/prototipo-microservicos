app.service('Comment', function (RESTfulServiceFactory) {
  RESTfulServiceFactory(this)
  this.baseUrl = 'comments'
})
