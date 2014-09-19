angular.module('myApp')
.factory('ExamplesService', function ($resource) {
    return $resource('/examplesService');
})
.factory('SpecService', function ($resource) {
    return $resource('/specService');
})
.factory('ImplsService', function ($resource) {
    return $resource('/implsService');
})
.factory('OnlineImplsService', function ($resource) {
    return $resource('/onlineImplsService');
});