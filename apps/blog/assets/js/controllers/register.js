app.controller('RegisterCtrl', function ($scope, Account, ShowMessage, $location) {
  $scope.account = {}

  $scope.register = function () {
    if (!$scope.account.name || !$scope.account.username || !$scope.account.password) return
    Account.save($scope.account, function (err, success) {
      if (err) return ShowMessage(err.message, 'error', err.data)
      ShowMessage(success.message, 'success')
      ShowMessage('Efetue login para acessar o sistema.', 'success')
      $location.path('/login')
    })
  }
})
