angular.module('myApp', ['ngRoute', 'ngResource'])
.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}])
.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/image_show.html',
        controller: 'ImageController'
    })
    .when('/widgets/:widget', {
        templateUrl: '/widget_show.html',
        controller: 'WidgetController'
    });
}]);
angular.module('myApp')
.directive('myJsonformat', function () {
    return {
        'restrict': 'A',
        'scope': {
            'jsonString': '=myJsonformat' 
        },
        'template': '{{jsonFormat}}',
        'link': function(scope, element, attr) {
            scope.$watch('jsonString', function (value) {
                scope.jsonFormat = value;
            });
        }
    };
})
.directive('myLoading', function () {
    return {
        'restrict': 'A',
        'scope': {
            'load': '&myLoading'
        },
        'link': function(scope, element, attr) {
            angular.element(document).on('scroll', function () {
                var rect = element[0].getBoundingClientRect();
                var viewport = {
                    'width': document.documentElement.clientWidth,
                    'height': document.documentElement.clientHeight
                };
                if (rect.top < viewport.height) {
                    scope.load();
                }
            });
        }
    };
});
angular.module('myApp')
.controller('ExamplesController', ["$scope", "ExamplesService", function ($scope, ExamplesService) {
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
}]);
angular.module('myApp')
.controller('ImageController', ["$scope", "$timeout", "ImageService", function ($scope, $timeout, ImageService) {
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
}]);
angular.module('myApp')
.factory('ImageService', ["$resource", function ($resource) {
    return $resource('/imageService');
}]);
angular.module('myApp')
.controller('ImplsController', ["$scope", "ImplsService", function ($scope, ImplsService) {
    $scope.ipl = $scope.ipl || {};
    ImplsService.get({
        'widgetName': $scope.req.widget
    }, function (resp) {
        if (resp.success) {
            $scope.ipl.impls = resp.content;
        }
    });
}]);
angular.module('myApp')
.controller('OnlineImplsController', ["$scope", "OnlineImplsService", function ($scope, OnlineImplsService) {
    $scope.opl = $scope.opl || {};
    OnlineImplsService.get({
        'implName': $scope.req.impl
    }, function (resp) {
        if (resp.success) {
            $scope.opl.onlineImpls = resp.content;
        }
    });
}]);
angular.module('myApp')
.controller('SpecController', ["$scope", "SpecService", function ($scope, SpecService) {
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
}]);
angular.module('myApp')
.controller('WidgetController', ["$scope", "$routeParams", function ($scope, $routeParams) {
    $scope.req = $scope.req || {};
    $scope.req.widget = $routeParams.widget;
    $scope.req.url = '/examples_show.html';
    $scope.req.flag = false;
    $scope.res = $scope.res || {};
}]);
angular.module('myApp')
.factory('ExamplesService', ["$resource", function ($resource) {
    return $resource('/examplesService');
}])
.factory('SpecService', ["$resource", function ($resource) {
    return $resource('/specService');
}])
.factory('ImplsService', ["$resource", function ($resource) {
    return $resource('/implsService');
}])
.factory('OnlineImplsService', ["$resource", function ($resource) {
    return $resource('/onlineImplsService');
}]);