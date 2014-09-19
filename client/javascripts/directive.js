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