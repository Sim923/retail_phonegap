/**
 * @fileOverview
 * @name subscriptions.signup.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'subscriptionsSignupService',
    [
      '$location',
      '$http',
      function($location, $http) {
        var subscriptionsSignupService = {};
        subscriptionsSignupService.plan = {};
        subscriptionsSignupService.plan._plan = '';

        /**
         * set
         * @param {string} p
         */
        subscriptionsSignupService.plan.set = function(p) {
          subscriptionsSignupService.plan._plan = p;
          $location.path('/subscription/payment');
        };

        /**
         * get
         * @returns {string} 
         */
        subscriptionsSignupService.plan.get = function() {
          return subscriptionsSignupService.plan._plan;
        };

        return subscriptionsSignupService;
      }
    ]
  );
})(console, angular);