angular.module('myApp')
.controller('ImplsController', function ($scope, ImplsService) {
    $scope.ipl = $scope.ipl || {};
    ImplsService.get({
        'widgetName': $scope.req.widget
    }, function (resp) {
        if (resp.success) {
            $scope.ipl.impls = resp.content;
        }
    });
});