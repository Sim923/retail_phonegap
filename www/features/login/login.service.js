/**
 * @fileOverview login service
 * @name loginService.js
 * @author Matthew Aaron Raymer (matthew.raymer@anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'loginService',
    [
      '$http',
      'authFactory',
      'deviceService',
      function($http, authFactory, deviceService) {
        var loginService = {};
        loginService.login = function(username, password) {
          var socketid = deviceService.data._data.socketId;
          return authFactory.login(username, password, socketid);
        };

        loginService.isLoggedIn = function() {
          return authFactory.isUserLogged();
        };
        return loginService;
      }
    ]
  );
})(angular);
