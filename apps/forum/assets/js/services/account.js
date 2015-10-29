app.service('Account', function (RESTfulServiceFactory, $http, APP_ID, API) {
  RESTfulServiceFactory(this)
  this.baseUrl = 'accounts'

  this.login = function (params, callback) {
    var self = this
    params.app_id = APP_ID
    $http({
      url: API + '/' + self.baseUrl + '/login',
      method: 'post',
      data: params
    })
    .success(function (res) {
      callback(null, res)
    })
    .error(callback)
  }
})
