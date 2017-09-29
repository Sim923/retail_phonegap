/**
 * @fileOverview
 * @name register.quick.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "register.quick.controller",
    [
      '$state',
      'deviceService',
      'alertService',
      'registerQuickService',
      function($state, deviceService, alertService, registerQuickService) {
        var model = registerQuickService.model.get();

        /**
         * @function register
         * @param {object}
         */
        var register = function() {
          model.socketid = deviceService.data._data.socketId;
          registerQuickService.model.set(model);
          registerQuickService.register().then(
            function(resp) {
              console.log("success ----------"+JSON.stringify(resp));
              deviceService.setRegistered();
              alertService.successAlert();
              $state.go('register.confirm');
            },
            function(err) {
              console.log("err -----------"+JSON.stringify(err));
              alertService.errorAlert();
              alertService.setAlertText(err.data);              
            }
          );
        };

        /**
         * init
         */
        var init = function() {
          console.log('register.quick.controller.init');
        };

        init();

        angular.extend(
          this, {
            model:model,
            register:register
          }
        );
      }
    ]
  );
})(console, angular);
