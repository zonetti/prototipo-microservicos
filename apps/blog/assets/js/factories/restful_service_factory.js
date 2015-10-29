app.factory('RESTfulServiceFactory', function (API, APP_ID, $http) {
  function RESTfulService (service) {
    service.baseUrl = ''

    service.list = function (params, callback) {
      params.app_id = APP_ID
      $http({
        url: API + '/' + service.baseUrl,
        method: 'get',
        params: params
      })
      .success(function (res) {
        res.data = res.data.map(function (item) {
          if (item.created_at) {
            item.created_at = new Date(item.created_at)
          }
          if (item.updated_at) {
            item.updated_at = new Date(item.updated_at)
          }
          return item
        })
        callback(null, res)
      })
      .error(callback)
    }

    service.save = function (params, callback) {
      var method = params.id ? 'put' : 'post'
      params.app_id = APP_ID
      $http({
        url: API + '/' + service.baseUrl + (params.id ? '/' + params.id : ''),
        method: method,
        data: params
      })
      .success(function (res) {
        callback(null, res)
      })
      .error(callback)
    }

    service.read = function (id, callback) {
      var params = {
        app_id: APP_ID
      }
      $http({
        url: API + '/' + service.baseUrl + '/' + id,
        method: 'get',
        params: params
      })
      .success(function (res) {
        if (res.data.created_at) {
          res.data.created_at = new Date(res.data.created_at)
        }
        if (res.data.updated_at) {
          res.data.updated_at = new Date(res.data.updated_at)
        }
        callback(null, res)
      })
      .error(callback)
    }

    service.remove = function (id, callback) {
      var params = {
        app_id: APP_ID
      }
      $http({
        url: API + '/' + service.baseUrl + '/' + id,
        method: 'delete',
        params: params
      })
      .success(function (res) {
        callback(null, res)
      })
      .error(callback)
    }
  }

  return RESTfulService
})
