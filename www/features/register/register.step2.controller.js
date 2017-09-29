/**
 * @fileOverview register view controller 
 * @name register.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'register.step2.controller',
    [
      '$log',
      '$state',
      'addressService',
      'registerService',
      function($log, $state, addressService, registerService) {
        var model = registerService.model.get();

        /**
         * back
         */
        var back = function() {
          $state.go('register');
        };

        /**
         * next
         */
        var next = function() {
          model.address._address.line1 = model.line1;
          model.address._address.line2 = model.line2;
          model.address._address.city = model.city;
          model.address._address.state = model.state;
          model.address._address.zipCode = model.zipCode;
          model.address._address.phone = model.phone;
          registerService.model.set(model);
          addressService.address.set(model);
          addressService.address.validate().then(
            function(resp) {
              var address = resp.data.address.address;
              $state.go('register.step3');
            },
            function(resp) {
              //TODO:display error messages.
            }
          );
        };

        /**
         * init
         */
        var init = function() {
          $log.log('register.step2.controller.init');
        };
        init();
        angular.extend(this, {
          model:model,
          back:back,
          next:next
        });
      }
    ]
  );
})(angular);