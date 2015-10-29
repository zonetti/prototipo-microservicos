app.controller('BlogCtrl', function ($scope, Post, ShowMessage) {
  $scope.loaded = false
  $scope.posts = []

  Post.list({}, function (err, success) {
    if (err) return ShowMessage(err.message, 'error', err.data)
    $scope.loaded = true
    $scope.posts = success.data
  })
})
