angular.module('myApp', ['ngRoute', 'ngResource'])
.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}])
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/image_show.html',
        controller: 'ImageController'
    })
    .when('/widgets/:widget', {
        templateUrl: '/widget_show.html',
        controller: 'WidgetController'
    });
});