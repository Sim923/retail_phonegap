/**
 * @fileOverview
 * @name recovery.success.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'recovery.success.controller',
    [
      'recoverySuccessService',
      function(recoverySuccessService) {

        /**
         * login
         */
        var login = function() {
          return recoverySuccessService.login();
        };

        /**
         * init
         */
        var init = function() {
          console.log("recovery.success.controller.init");
        };
        init();

        angular.extend(this, {
          login:login
        });

      }
    ]
  );
})(console, angular);
