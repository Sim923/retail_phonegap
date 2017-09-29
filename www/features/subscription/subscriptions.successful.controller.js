/**
 * @fileOverview
 * @name subscriptions.successful.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'subscriptions.success.controller',
    [
      'subscriptionsSuccessfulService',
      'subscriptionService',
      function(subscriptionsSuccessfulService, subscriptionService) {
        var model = {};
        model.plan = subscriptionService.plan.get();
        /**
         * init
         */
        var init = function() {
          console.log('subsscriptions.successful.controller');
        };

        init();

        angular.extend(
          this,
          {
            plan:model.plan
          }
        );
      }
    ]
  );
})(console, angular);