/**
 * @fileOverview
 * @name recovery.success.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "recoverySuccessService",
    [
      "$state",
      "recoveryService",
      function($state, recoveryService) {
        var recoverySuccessService = {};

        /**
         * login
         * @returns {callback} 
         */
        recoverySuccessService.login = function() {
          return $state.go("login");
        };

        /**
         * init
         */
        recoverySuccessService.init = function() {
          console.log("recovery.success.service.init");
        };
        recoverySuccessService.init();

        return recoverySuccessService;
      }
    ]
  );
})(console, angular);
