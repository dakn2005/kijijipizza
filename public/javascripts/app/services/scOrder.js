'use strict';

/* Services */

var orderServices = angular.module('orderServices', []); //'ngResource'

orderServices.factory('Orders', ['$resource',
    function ($resource) {
        return $resource('/orders/:orderId', {
                orderId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            }

        );
    }]);