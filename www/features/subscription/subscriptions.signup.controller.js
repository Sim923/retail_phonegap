/**
 * @fileOverview
 * @name subscriptions.signup.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'subscriptions.signup.controller',
    [
      'account',
      'subscriptions',
      'subscriptionsSignupService',
      function(account, subscriptions, subscriptionsSignupService) {

        /**
         * init
         */
        var init = function() {
          console.log('subsscriptions.signup.controller');
        };

        init();

        angular.extend(
          this,
          {
            account:account.data,
            subscriptions:subscriptions.data
          }
        );
      }
    ]
  );
})(console, angular);