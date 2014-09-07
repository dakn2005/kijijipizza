var userControllers = angular.module('userControllers', []);

userControllers.controller('userController', ['$scope', '$routeParams', '$location', 'Users', 'Global',
    function ($scope, $routeParams, $location, Users, Global) {
        //$scope.empwelcome = "Employee page";

        if (Global.currentUser() == undefined || Global.currentUser() == null) {
            $location.path("/unauth");
            return;
        };
//        else if (!Global.isAdmin()) {
//            $location.path("/unauth");
//            return;
//        }

        $scope.allUsers = function (query) {
            Users.query(query, function (users) {
                $scope.users = users;
            });

        };

        $scope.oneUser= function () {
            Users.get({
                userId: $routeParams.userId
            }, function (user) {
                $scope.users = user;
            });
        };

        $scope.updateUser = function () {
            var usr = $scope.users;

            usr.$update(function () {
                $location.path('users/' + usr._id);
            });
        };

        $scope.deleteUser = function (user) {
            if (confirm('delete?')) {
                user.$remove();
                $location.path("users/");
            }
        };

    }]);