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
    'register.success.controller',
    [
      '$log',
      '$state',
      'registerService',
      function($log, $state, registerService) {
        var model = registerService.model.get();

        /**
         * browse
         */
        var browse = function() {
          $state.go('home');
        };

        /**
         * login
         */
        var login = function() {
          $state.go('login');
        };

        /**
         * init
         */
        var init = function() {
          $log.log('register.controller.init');
        };
        init();

        angular.extend(this, {
          model:model,
          browse:browse,
          login:login
        });
      }
    ]
  );
})(angular);