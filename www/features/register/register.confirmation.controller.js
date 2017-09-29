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
    'register.confirmation.controller',
    [
      '$log',
      '$state',
      'registerService',
      function($log, $state, registerService) {
        var model = {};
        model.firstName = "";

        var login = function() {
          $state.go('login');
        };

        var init = function() {
          $log.log('register.confirmation.controller.init');
        };
        init();

        angular.extend(this, {
          model:model,
          login:login
        });
      }
    ]
  );
})(angular);