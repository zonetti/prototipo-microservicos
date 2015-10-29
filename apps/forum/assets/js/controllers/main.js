app.controller('MainCtrl', function ($scope, $rootScope, $location, ShowMessage) {
  $rootScope.logout = function () {
    $rootScope.user = false
    $location.path('/')
  }

  $scope.moment = moment
})
