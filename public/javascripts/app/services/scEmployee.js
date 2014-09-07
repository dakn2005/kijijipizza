'use strict';

/* Services */

var employeeServices = angular.module('employeeServices', ['ngResource']);

employeeServices.factory('Employees', ['$resource',
    function ($resource) {
        return $resource('/employees/:empId', {
                empId: '@_id'
            }, {
//                query: {
//                    method: 'get',
//                    params: {
//                        empId: '@_id'
//                    },
//                    isArray: true
//                },
                update: {
                    method: 'PUT'
                }
            }

        );
    }]);