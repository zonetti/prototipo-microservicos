app.controller('LoginCtrl', function ($scope, $rootScope, Account, ShowMessage, $location) {
  $scope.account = {}

  if ($rootScope.user) {
    $location.path('/')
  }
  
  $scope.login = function () {
    if (!$scope.account.username || !$scope.account.password) return
    Account.login($scope.account, function (err, success) {
      if (err) return ShowMessage(err.message, 'error', err.data)
      ShowMessage(success.message, 'success')
      $rootScope.user = success.data
      $location.path('/panel/posts')
    })
  }
})
