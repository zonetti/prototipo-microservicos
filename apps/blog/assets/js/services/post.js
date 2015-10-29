app.service('Post', function (RESTfulServiceFactory) {
  RESTfulServiceFactory(this)
  this.baseUrl = 'posts'
})
