var app = angular.module('app', ['ngRoute', 'angular-loading-bar'])

app.constant('APP_ID', 'forum')
app.constant('API', 'http://localhost:3000')

moment.locale('pt-br')

app.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    })
    .when('/', {
      templateUrl: '/views/forum.html',
      controller: 'ForumCtrl'
    })
    .when('/topic/new', {
      templateUrl: '/views/forum_form.html',
      controller: 'ForumFormCtrl'
    })
    .when('/topic/edit/:id', {
      templateUrl: '/views/forum_form.html',
      controller: 'ForumFormCtrl'
    })
    .when('/topic/:id', {
      templateUrl: '/views/forum_topic.html',
      controller: 'ForumTopicCtrl'
    })
    .otherwise({
      redirect: '/'
    })
})
