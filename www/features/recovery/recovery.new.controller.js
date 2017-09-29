/**
 * @fileOverview
 * @name recovery.new.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'recovery.new.controller',
    [
      'recoveryNewService',
      function(recoveryNewService) {

        var newPassword = "";
        var confirmNewPassword = "";
        var $this=this;

        /**
         * savePassword
         */
        var savePassword = function() {
          return recoveryNewService.reset($this.confirmNewPassword);
        };

        /**
         * init
         */
        var init = function() {
          console.log("recovery.new.controller.init");
        };
        init();

        angular.extend(this, {
          newPassword:newPassword,
          confirmNewPassword:confirmNewPassword,
          savePassword:savePassword
        });

      }
    ]
  );
})(console, angular);
