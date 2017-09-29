/**
 * @fileOverview
 * @name recovery.check.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'recovery.check.controller',
    [
      'recoveryService',
      'recoveryCheckService',
      function(recoveryService, recoveryCheckService) {

        var emailCode = "";
        var $this=this;

        /**
         * confirmCode
         */
        var confirmCode = function() {
          return recoveryCheckService.confirmCode($this.emailCode).then(
            function(resp) {
              recoveryService.data.token=$this.emailCode;
              return recoveryCheckService.next();
            },
            function(resp) {
            }
          );
        };

        /**
         * resend
         */
        var resend = function() {
          return recoveryCheckService.resend();
        };

        /**
         * login
         */
        var login = function() {
          return recoveryCheckService.login();
        };

        /**
         * init
         */
        var init = function() {
          console.log("recovery.check.controller.init");
        };
        init();

        angular.extend(this, {
          emailCode:emailCode,
          confirmCode:confirmCode,
          resend:resend,
          login:login
        });

      }
    ]
  );
})(console, angular);
