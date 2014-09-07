'use strict';

/* Services */

var userServices = angular.module('userServices', ['ngResource']);

userServices.factory('Users', ['$resource',
    function ($resource) {
        return $resource('/users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);