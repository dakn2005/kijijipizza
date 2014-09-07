var employeeControllers = angular.module('employeeControllers', []);

employeeControllers.controller('eHomeController', ['$scope', '$routeParams', '$location', 'Employees','Users', 'Global',
    function ($scope, $routeParams, $location, Employees,Users, Global) {
        //$scope.empwelcome = "Employee page";

        if (Global.currentUser() == undefined || Global.currentUser() == null) {
            $location.path("/unauth");
            return;
        }
//        else if (!Global.isAdmin()) {
//            $location.path("/unauth");
//            return;
//        }

        $scope.allEmployees = function (query) {
            Employees.query(query, function (employees) {
                $scope.employees = employees;
            });

        };
        
        $scope.allUsers=function(query){
            Users.query(query, function (users) {
                $scope.users = users;
            });
        };

        $scope.oneEmployee = function () {
            Employees.get({
                empId: $routeParams.empId
            }, function (employee) {
                $scope.employees = employee;
            });
        };

        $scope.createEmployee = function () {
            var employee = new Employees({
                name: this.employee.name,
                email: this.employee.email,
                idnumber: this.employee.idnumber,
                userid: this.employee.userid
            });

            employee.$save(function (response) {
                $location.path("employees/"); // + response._id
                //console.log(response.output);
            });
        };


        $scope.updateEmployee = function () {
            var emp = $scope.employees;
            
            //console.log(emp);
            
            emp.$update(function () {
                $location.path('employees/' + emp._id);
            });
        }

        $scope.deleteEmployee = function (employee) {
            if (confirm('delete?')) {
                employee.$remove();
                $location.path("employees/");
            }
        }

    }]);