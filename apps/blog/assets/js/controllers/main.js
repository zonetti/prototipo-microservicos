app.controller('MainCtrl', function ($scope, $rootScope, $location, ShowMessage) {
  $scope.$on('$routeChangeSuccess', function (event) {
    var internalRoute = /^\/panel.*$/
    if (!$rootScope.user && internalRoute.test($location.path())) {
      ShowMessage('Acesso negado!', 'warning')
      $location.path('/')
    }
  })

  $rootScope.logout = function () {
    $rootScope.user = false
    $location.path('/')
  }

  $scope.moment = moment
})
