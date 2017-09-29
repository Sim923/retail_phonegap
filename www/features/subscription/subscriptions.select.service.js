/**
 * @fileOverview
 * @name profile.items.service.js
 * @author 
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'subscriptionSelectService',
    [
      '$log',
      '$http',
      '$state',
      function($log, $http, $state) {
        var subscriptionSelectService = {};

        subscriptionSelectService.init = function() {
          $log.log('profile.subscription.select.service.init');
        };
        subscriptionSelectService.init();
        return subscriptionSelectService;
      }
    ]
  );
})(console, angular);