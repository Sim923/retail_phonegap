/**
 * @fileOverview
 * @name recovery.enter.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "recoveryEnterService",
    [
      "$state",
      "recoveryService",
      function($state, recoveryService) {
        var recoveryEnterService = {};

        /**
         * forgot
         * @param {string} email
         */
        recoveryEnterService.forgot = function(email) {
          recoveryService.data.email = email;
          return recoveryService.forgot(email);
        };

        /**
         * next
         */
        recoveryEnterService.next = function() {
          return $state.go("login.recovery.check");
        };

        /**
         * init
         */
        recoveryEnterService.init = function() {
          console.log("recovery.enter.service.init");
        };
        recoveryEnterService.init();

        return recoveryEnterService;
      }
    ]
  );
})(console, angular);
