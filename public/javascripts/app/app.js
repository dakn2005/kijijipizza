/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

/* App Module */
//$(document).ready(function () {
//	if (window.location.hash == "#_=_") window.location.hash = "";
//    window.init();
//});

var pizzaHutApp = angular.module('pizzaHutApp', [
    'ngRoute', 'ngAnimate', 'ngResource',
    'pizzahut.controllers', 'pizzahut.services'
]);

angular.module('pizzahut.controllers', ['introControllers', 'employeeControllers', 'headerControllers','orderControllers', 'userControllers']); //
angular.module('pizzahut.services', ['employeeServices', 'globalService', 'userServices', 'orderServices']);

pizzaHutApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'javascripts/app/partials/home.html',
            controller: 'IndexController'
        }).
         when('/contact', {
            templateUrl: 'javascripts/app/partials/contactus.html',
        }).
        
        when('/employees', {
            templateUrl: 'javascripts/app/partials/employee/list.html',
            controller: 'eHomeController'
        }).
        when('/employees/create', {
            templateUrl: 'javascripts/app/partials/employee/create.html',
            controller: 'eHomeController'
        }).
        when('/employees/:empId/update', {
            templateUrl: 'javascripts/app/partials/employee/update.html',
            controller: 'eHomeController'
        }).
        when('/employees/:empId', {
            templateUrl: 'javascripts/app/partials/employee/view.html',
            controller: 'eHomeController'
        }).
        when('/users', {
            templateUrl: 'javascripts/app/partials/user/list.html',
            controller: 'userController'
        }).
        when('/users/:userId/update', {
            templateUrl: 'javascripts/app/partials/user/update.html',
            controller: 'userController'
        }).
        when('/users/:userId', {
            templateUrl: 'javascripts/app/partials/user/view.html',
            controller: 'userController'
        }).
        when('/orders', {
            templateUrl: 'javascripts/app/partials/order/list.html',
            controller: 'orderController'
        }).
        when('/orders/create', {
            templateUrl: 'javascripts/app/partials/order/create.html',
            controller: 'orderController'
        }).
        when('/orders/deliveryschedule', {
            templateUrl: 'javascripts/app/partials/order/deliveryschedule.html',
            controller: 'orderController'
        }).
        when('/orders/deliveryschedule/view', {
            templateUrl: 'javascripts/app/partials/order/view.html',
            controller: 'orderController'
        }).
        when('/orders/:orderId/update', {
            templateUrl: 'javascripts/app/partials/order/update.html',
            controller: 'orderController'
        }).
        when('/orders/:orderId', {
            templateUrl: 'javascripts/app/partials/order/view.html',
            controller: 'orderController'
        }).
        when('/unauth', {
            templateUrl: 'javascripts/app/partials/unauthorized.html'
        }).
       
        otherwise({
            redirectTo: '/home'
        });
  }]);