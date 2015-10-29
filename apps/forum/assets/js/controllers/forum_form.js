app.controller('ForumFormCtrl', function ($scope, $rootScope, Post, ShowMessage,
  $routeParams, $location) {
  $scope.loaded = false
  $scope.post = {}

  if (!$rootScope.user) {
    $location.path('/')
  }

  if ($routeParams.id) {
    Post.read($routeParams.id, function (err, success) {
      if (err) {
        ShowMessage(err.message, 'error', err.data)
        $location.path('/')
      }
      $scope.post = success.data
      $scope.loaded = true
    })
  } else {
    $scope.loaded = true
  }

  $scope.save = function () {
    if (!$scope.post.title || !$scope.post.body) return
    $scope.post.account_id = $rootScope.user.id
    delete $scope.post.account
    Post.save($scope.post, function (err, success) {
      if (err) return ShowMessage(err.message, 'error', err.data)
      ShowMessage(success.message, 'success')
      $location.path('/topic/' + success.data.id)
    })
  }
})
