/**
 * @fileOverview
 * @name listing.options.payment.service.js
 * @author
 * @license
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "itemOptionsPaymentService",
    [
      '$location',
      '$http',
      'baseurlService',
      function($location, $http, baseurlService) {

        var itemOptionsPaymentService = {};

        var baseUrl = baseurlService.address;

        itemOptionsPaymentService.model = {};
        itemOptionsPaymentService.model._model = {};

        /**
         * model.set
         * @param {object} model
         */
        itemOptionsPaymentService.model.set = function(model) {
          itemOptionsPaymentService.model._model=model;
        };

        /**
         * model.get
         * @returns {} 
         */
        itemOptionsPaymentService.model.get = function() {
          return angular.copy(itemOptionsPaymentService.model._model);
        };

        /**
         * pay
         * @param {object} data
         * @returns {callback}
         */
        itemOptionsPaymentService.pay = function(data) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listings/options/pay",
            data: itemOptionsPaymentService.model.get(),
            headers: {
	      "Content-Type": "application/json"
            }
          });
        };

        /**
         * @function init
         */
        itemOptionsPaymentService.init = function() {
          console.log("itemOptionsPaymentService.init");
        };
        itemOptionsPaymentService.init();
        return itemOptionsPaymentService;
      }
    ]
  );
})(console, angular);
