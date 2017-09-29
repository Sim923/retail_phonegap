/**
 * @fileOverview
 * @name confirm.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "confirm.controller",
    [
      '$timeout',
      "confirm",
      'confirmService',
      'userService',
      "alertService",
      function($timeout, confirm, confirmService, userService, alertService) {
        var model = {};
        model.email = '';
        model.resend=confirm.resend;
        model.resent=false;
        model.success=confirm.status;
        model.message=confirm.data.message;

        /**
         * reconfirm
         */
        var reconfirm = function() {
          confirmService.confirm(model.email).then(
            function(resp) {
              $timeout(function() {
                model.resent=true;
                model.resend=false;
                model.message="Confirmation resent.  Please check your inbox.";
              },1000);
            },
            function(resp) {
            }
          );
        };

        /**
         * init
         */
        var init = function() {
          console.log('confirm.controller.init');
          userService.model._model.isConfirmed=confirm.status;
          console.log(userService.model._model);
        };

        init();

        angular.extend(
          this, {
            model:model,
            reconfirm:reconfirm
          }
        );
      }
    ]
  );
})(console, angular);
