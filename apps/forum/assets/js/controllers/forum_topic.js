app.controller('ForumTopicCtrl', function ($scope, $rootScope, Post, ShowMessage,
  $routeParams, $location, Comment) {
  $scope.loaded = false
  $scope.comments = []
  $scope.newComment = ''

  function getReplies () {
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
    getReplies()
  })

  $scope.remove = function () {
    if (!$rootScope.user || $scope.post.account_id !== $rootScope.user.id) return
    Post.remove($scope.post.id, function (err) {
      if (err) return ShowMessage(err.message, 'error', err.data)
      ShowMessage('Tópic removido com sucesso.', 'success')
      $location.path('/')
    })
  }

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
      ShowMessage('Resposta adicionada com sucesso.', 'success')
      getReplies()
    })
  }
})
