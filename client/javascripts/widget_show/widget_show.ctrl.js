angular.module('myApp')
.controller('WidgetController', function ($scope, $routeParams) {
    $scope.req = $scope.req || {};
    $scope.req.widget = $routeParams.widget;
    $scope.req.url = '/examples_show.html';
    $scope.req.flag = false;
    $scope.res = $scope.res || {};
});