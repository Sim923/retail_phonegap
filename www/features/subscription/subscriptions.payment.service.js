/**
 * @fileOverview
 * @name subscriptions.payment.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
   'use strict';
   var RTMobileApp = angular.module('RTMobileApp');
   RTMobileApp.factory(
     'subscriptionsPaymentService',
     [
       '$http',
       'baseurlService',
       function($http, baseurlService) {
         var subscriptionsPaymentService = {};
         subscriptionsPaymentService.model = {};
         subscriptionsPaymentService.model._model = {};
         var baseUrl = baseurlService.address;

         /**
          * model.set
          * @param {object} model
          */
         subscriptionsPaymentService.model.set = function(model) {
           subscriptionsPaymentService.model._model = model;
         };

         /**
          * model.get
          * @returns {object} 
          */
         subscriptionsPaymentService.model.get = function() {
           return subscriptionsPaymentService.model._model;
         };

         /**
          * subscribe
          */
         subscriptionsPaymentService.subscribe = function() {
           var config = {
             method:'POST',
             url:baseUrl+'/rtapi/v1/subscriptions',
             data:subscriptionsPaymentService.model.get(),
             headers: {
         "Content-Type": "application/json"
             }
           };
           return $http(config);
         };

         /**
          * upgrade
          * @returns {callback} 
          */
         subscriptionsPaymentService.upgrade = function() {
           var config = {
             method:'PUT',
             url:baseUrl+'/rtapi/v1/subscriptions',
             data:subscriptionsPaymentService.model.get(),
             headers: {
         "Content-Type": "application/json"
             }
           };
           return $http(config);
         };

         /**
          * cancel
          */
         subscriptionsPaymentService.cancel = function() {
           var config = {};
           return $http(config);
         };

         /**
          * update
          */
         subscriptionsPaymentService.update = function() {
           var config = {};
           return $http(config);
         };

         return subscriptionsPaymentService;
       }
     ]
   );
})(console, angular);