var introControllers = angular.module('introControllers', []);

introControllers.controller('IndexController', ['$scope',
    function($scope) {
        $scope.projectName="Welcome to KijijiPizza";
    }]);