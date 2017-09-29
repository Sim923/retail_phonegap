/**
 * @fileOverview
 * @name subscription.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "subscription.controller",
    [
      '$state',
      'subscriptionService',
      'cartService',
      'userService',
      'paymentService',
      'account',
      'subscriptions',
      function SubscriptionCtrl(
        $state,
        subscriptionService,
        cartService,
        userService,
        paymentService,
        account,
        subscriptions
      ) {
        subscriptionService.set(subscriptions.data);
        subscriptionService.plan.set(account.data.subscription.name);
        var model = subscriptionService.plan.get();
        model.active_until=userService.model.get().active_until;

        /**
         * INIT FUNCTIONS
         */
        var init = function() {
        };
        init();

        angular.extend(this, {
          model:model
        });
      }
    ]
  );
})(console, angular);