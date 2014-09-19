angular.module('myApp')
.controller('ImageController', function ($scope, $timeout, ImageService) {
    $scope.req = $scope.req || {};
    $scope.req.flag = true;
    ImageService.get(function (resp) {
        $scope.res = $scope.res || {};
        if (resp.success) {
            $scope.res.all = resp.content;
            $scope.res.images = $scope.res.all.slice(0, 20);
        }
    });
    $scope.req.load = function () {
        $timeout(function () {
            $scope.res.images = $scope.res.all.slice(0, $scope.res.images.length + 20);
            if ($scope.res.images.length == $scope.res.all.length) {
                $scope.req.flag = false;
            }
        }, 1000);
    };
});