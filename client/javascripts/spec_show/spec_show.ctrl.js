angular.module('myApp')
.controller('SpecController', function ($scope, SpecService) {
    $scope.spc = $scope.spc || {};
    $scope.spc.editable = false;
    SpecService.get({
        'widgetName': $scope.req.widget
    }, function (resp) {
        if (resp.success) {
            $scope.spc.spec = resp.content;
        }
    });
    $scope.spc.update = function () {
        SpecService.save({}, {
            'widgetName': $scope.req.widget,
            'spec': $scope.spc.spec
        }, function (resp) {
            if (resp.success) {
                alert('更新成功');
                $scope.spc.editable = false;
            }
        });
    };
});