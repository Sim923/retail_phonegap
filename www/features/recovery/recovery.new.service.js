/**
 * @fileOverview
 * @name recovery.new.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "recoveryNewService",
    [
      "$state",
      "recoveryService",
      function($state, recoveryService) {
        var recoveryNewService = {};

        recoveryNewService.data = {};
        recoveryNewService.data.token = "";

        /**
         * reset
         * @param {string} password
         * @returns {callback} 
         */
        recoveryNewService.reset = function(password) {
          var token = recoveryService.data.token;
          return recoveryService.reset(password, token).then(
            function(resp) {
              $state.go("login.recovery.success");
            },
            function(resp) {
            }
          );
        };

        /**
         * init
         */
        recoveryNewService.init = function() {
          console.log("recovery.new.service.init");
        };
        recoveryNewService.init();

        return recoveryNewService;
      }
    ]
  );
})(console, angular);
