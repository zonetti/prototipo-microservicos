app.controller('PanelListCtrl', function ($scope, $rootScope, Post, ShowMessage,
  $location, $route) {
  $scope.loaded = false
  $scope.posts = []

  Post.list({account_id: $rootScope.user.id}, function (err, success) {
    if (err) {
      ShowMessage(err.message, 'error', err.data)
      $rootScope.logout()
    }
    $scope.loaded = true
    $scope.posts = success.data
  })

  $scope.edit = function (postId) {
    $location.path('/panel/posts/' + postId)
  }

  $scope.remove = function (postId) {
    Post.remove(postId, function (err, success) {
      if (err) return ShowMessage(err.message, 'error', err.data)
      $route.reload()
    })
  }
})
