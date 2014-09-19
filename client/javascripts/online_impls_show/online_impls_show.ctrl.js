angular.module('myApp')
.controller('OnlineImplsController', function ($scope, OnlineImplsService) {
    $scope.opl = $scope.opl || {};
    OnlineImplsService.get({
        'implName': $scope.req.impl
    }, function (resp) {
        if (resp.success) {
            $scope.opl.onlineImpls = resp.content;
        }
    });
});