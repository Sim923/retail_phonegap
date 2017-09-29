/**
 * @fileOverview register view controller 
 * @name register.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'register.step3.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'deviceService',
      'userService',
      'registerService',
      function($log, $state, $timeout, deviceService, userService, registerService) {
        var model = registerService.model.get();

        /**
         * back
         */
        var back = function() {
          $state.go('register.step2');
        };

        /**
         * register
         */
        var register = function() {
          model.dob = {};
          model.dob.day = model.dayOfBirth;
          model.dob.month = model.monthOfBirth;
          model.dob.year = model.yearOfBirth;
          model.socketid = deviceService.data._data.socketid;
          registerService.model.set(model);
          registerService.register().then(
            function(resp) {
              $timeout(
                function() {
                  $state.go('register.confirm');
                },
                1000
              );
            },
            function(resp) {
              console.log('err');
            }
          );
        };

        /**
         * init
         */
        var init = function() {
          $log.log('register.step3.controller.init');
        };
        init();

        angular.extend(this, {
          model:model,
          back:back,
          register:register
        });
      }
    ]
  );
})(console, angular);
