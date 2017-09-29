/**
 * @fileOverview
 * @name profile.items.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'subscriptions.select.controller',
    [
      '$log',
      'subscriptionSelectService',
      'subscriptionService',
      'subscriptions',
      'account',
      '$state',
      function($log, subscriptionSelectService, subscriptionService, subscriptions, account, $state) {
        subscriptionService.set(subscriptions.data);
        subscriptionService.plan.set(account.data.subscription.name);
        var model = {};
        model.subscriptions = subscriptionService.get();
        model.plan = subscriptionService.plan.get();

        model.select = function(plan) {
          subscriptionService.plan.set(plan);
          console.log(subscriptionService.plan.get());
          if (plan==="Bronze") {
            var planId = subscriptionService.plan.get().name;
            var name = planId.charAt(0).toUpperCase() + planId.substr(1).toLowerCase();
            var subscriptionId = subscriptionService.plan.get()._id;

            subscriptionService.plan.downgrade(subscriptionId, planId, name).then(
              function(resp) {
                $state.go("profile");
              },
              function(resp) {
              }
            );
          } else {
            $state.go("profile.subscription.payment");
          }
        };

        /**
         * init
         */
        var init = function() {
          $log.log('subscription.select.controller.init');
        };

        init();

        angular.extend(
          this,
          {
            account: account.data,
            subscriptions: model.subscriptions,
            plan: model.plan,
            model:model
          }
        );
      }
    ]
  );
})(console, angular);
