/**
 * @fileOverview
 * @name subscription.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "subscriptionService",
    [
      '$http',
      'rtsocket',
      'userService',
      'paymentService',
      'baseurlService',
      function($http, rtsocket, userService, paymentService, baseurlService) {

        var subscriptionService = {};
        var selectedSubscriptionId = null;
        var baseUrl = baseurlService.address;

        subscriptionService.subscriptions = {};

        subscriptionService.subscriptions.get = function() {
          return subscriptions;
        };

        subscriptionService._model = [];

        /**
         * set
         * @param {array} subscriptions
         */
        subscriptionService.set = function(subscriptions) {
          subscriptionService._model = subscriptions;
          for(var i=0;i<subscriptions.length;i++) {
            var str = subscriptionService._model[i].logo;
            subscriptionService._model[i].logo = str.replace("images", "img");
          }
        };

        /**
         * get
         * @returns {} 
         */
        subscriptionService.get = function() {
          return subscriptionService._model;
        };

        subscriptionService.plan = {};
        subscriptionService.plan._model = {};
        subscriptionService.plan._model.name = null;
        subscriptionService.plan._plan = "";
        subscriptionService.plan._subscriptionId = "";

        /**
         * plan.set
         * @param {string} plan
         */
        subscriptionService.plan.set = function(plan) {
          subscriptionService.plan._plan = plan;
          for (var i=0; i<subscriptionService._model.length; i++) {
            var o = subscriptionService._model[i];
            if (o.name===plan) {
              console.log(o);
              subscriptionService.plan._subscriptionId = o._id;
              subscriptionService.plan._name = o.name;
              subscriptionService.plan._model = angular.copy(o);
              subscriptionService.plan._plan = angular.copy(o);
              break;
            }
          }
        };

        /**
         * plan.get
         * @param {string} plan
         * @returns {string} 
         */
        subscriptionService.plan.get = function() {
          return subscriptionService.plan._plan;
        };

        /**
         * plan.model
         * @returns {} 
         */
        subscriptionService.plan.model = function() {
          return subscriptionService.plan._model;
        };

        /**
         * plan.downgrade
         * @param {string} subscriptionId
         * @param {string} planId
         * @param {string} name
         * @returns {callback} 
         */
        subscriptionService.plan.downgrade = function(subscriptionId, planId, name) {
          return $http({
            method:'PUT',
            url:baseUrl+'/rtapi/v1/subscriptions/downgrade',
            data: {
              subscriptionId:subscriptionId,
              planId:planId,
              name:name
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * init - Initialize the service
         */
        subscriptionService.init = function() {
          console.log("subscriptionService.init");
          rtsocket.responders.subscription = {
            update:function(data) {
              userService.model.set(data.user);
            }
          };
        };

        subscriptionService.init();

        return subscriptionService;
      }
    ]
  );
})(console, angular);