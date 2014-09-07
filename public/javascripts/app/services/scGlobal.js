var globalService = angular.module('globalService', []);

globalService.factory('Global', function () {
    var current_user = window.user;
    return {
        currentUser: function () {
            return current_user;
        },
        isSignedIn: function () {
            return !!current_user;
        },
        isAdmin: function () {
            return current_user == undefined || current_user == null ? false : current_user.isAdmin;
        },
        isEmployee: function () {
            return current_user == undefined || current_user == null ? false : current_user.isEmployee;
        },
        Cart: []
    };
});