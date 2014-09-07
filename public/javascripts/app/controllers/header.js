var headerControllers = angular.module('headerControllers', []);

headerControllers.controller('HeaderController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;
    }]);