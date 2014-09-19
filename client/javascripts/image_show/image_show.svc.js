angular.module('myApp')
.factory('ImageService', function ($resource) {
    return $resource('/imageService');
});