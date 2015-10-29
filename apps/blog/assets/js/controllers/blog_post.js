app.controller('BlogPostCtrl', function ($scope, $rootScope, Post, ShowMessage,
  $routeParams, $location, Comment) {
  $scope.loaded = false
  $scope.comments = []
  $scope.newComment = ''

  function getComments () {
    Comment.list({artifact_id: $routeParams.id}, function (err, success) {
      if (err) return ShowMessage(err.message, 'error', err.data)
      $scope.comments = success.data
    })
  }

  Post.read($routeParams.id, function (err, success) {
    if (err) {
      ShowMessage(err.message, 'error', err.data)
      $location.path('/')
    }
    $scope.post = success.data
    $scope.loaded = true
    getComments()
  })

  $scope.addComment = function () {
    if (!$scope.newComment) return
    var params = {
      account_id: $rootScope.user.id,
      artifact_id: $routeParams.id,
      comment: $scope.newComment
    }
    Comment.save(params, function (err, success) {
      if (err) return ShowMessage(err.message, 'error', err.data)
      $scope.newComment = ''
      ShowMessage(success.message, 'success')
      getComments()
    })
  }
})
