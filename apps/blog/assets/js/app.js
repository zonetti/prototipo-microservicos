var app = angular.module('app', ['ngRoute', 'angular-loading-bar'])

app.constant('APP_ID', 'blog')
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
      templateUrl: '/views/blog.html',
      controller: 'BlogCtrl'
    })
    .when('/post/:id', {
      templateUrl: '/views/blog_post.html',
      controller: 'BlogPostCtrl'
    })
    .when('/panel/posts', {
      templateUrl: '/views/panel/list.html',
      controller: 'PanelListCtrl'
    })
    .when('/panel/posts/new', {
      templateUrl: '/views/panel/form.html',
      controller: 'PanelFormCtrl'
    })
    .when('/panel/posts/:id', {
      templateUrl: '/views/panel/form.html',
      controller: 'PanelFormCtrl'
    })
    .otherwise({
      redirect: '/'
    })
})
