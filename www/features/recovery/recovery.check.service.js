/**
 * @fileOverview
 * @name recovery.check.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "recoveryCheckService",
    [
      "$log",
      "$state",
      "recoveryService",
      function($log, $state, recoveryService) {
        var recoveryCheckService = {};

        /**
         * confirmCode
         * @param {string} token
         * @returns {callback} 
         */
        recoveryCheckService.confirmCode = function(token) {
          return recoveryService.confirm(token);
        };

        /**
         * resend
         */
        recoveryCheckService.resend = function() {
          var email = recoveryService.data.email;
          return recoveryService.forgot(email);
        };

        /**
         * next
         * @returns {callback} 
         */
        recoveryCheckService.next = function() {
          return $state.go("login.recovery.new");
        };

        /**
         * init
         */
        recoveryCheckService.init = function() {
          console.log("recovery.check.service.init");
        };
        recoveryCheckService.init();

        return recoveryCheckService;
      }
    ]
  );
})(console, angular);
