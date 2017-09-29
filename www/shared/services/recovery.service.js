/**
 * @fileOverview
 * @name recovery.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "recoveryService",
    [
      "$http",
      'baseurlService',
      function($http, baseurlService) {
        var recoveryService = {};
        recoveryService.data = {};
        recoveryService.data.email = "";
        recoveryService.data.token = "";

        var baseUrl = baseurlService.address;

        /**
         * confirm
         */
        recoveryService.confirm = function(token) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/users/token",
            data: {
              token:token
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * forgot
         * @param {string} email
         * @returns {callback} 
         */
        recoveryService.forgot = function(email) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/users/forgot",
            data: {
              email: email,
              mobile:true
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * reset
         * @param {string} password
         * @param {string} token
         * @returns {callback} 
         */
        recoveryService.reset = function(password, token) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/users/reset",
            data: {
              password:password,
              token:token
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * init
         */
        recoveryService.init = function() {
          console.log("recovery.success.service.init");
        };

        recoveryService.init();

        return recoveryService;
      }
    ]
  );
})(console, angular);