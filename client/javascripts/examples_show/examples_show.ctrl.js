angular.module('myApp')
.controller('ExamplesController', function ($scope, ExamplesService) {
    $scope.exp = $scope.exp || {};
    ExamplesService.get({
        'widgetName': $scope.req.widget
    }, function (resp) {
        if (resp.success) {
            $scope.exp.examples = resp.content;
        }
    });
    $scope.exp.submit = function () {
        ExamplesService.save({}, {
            'widgetName': $scope.req.widget,
            'img': $scope.exp.img,
            'config': $scope.exp.config
        }, function (resp) {
            if (resp.success) {
                alert('添加成功');
                $scope.exp.examples.push({
                    'img': $scope.exp.img,
                    'config': $scope.exp.config
                });
                $scope.exp.flag = !$scope.exp.flag;
                $scope.exp.img = '';
                $scope.exp.config = '';
            }
        });
    };
    $scope.exp.remove = function (index) {
        var flag = confirm("确认要删除吗？");
        if (flag) {
            ExamplesService.remove({
                'widgetName': $scope.req.widget,
                'index': index
            }, function (resp) {
                if (resp) {
                    alert('删除成功');
                    $scope.exp.examples.splice(index, 1);

                }
            });
        }
    };
});