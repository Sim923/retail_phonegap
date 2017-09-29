/**
 * @fileOverview
 * @name adventure.options.payment.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "adventureOptionsPaymentService",
    [
      '$http',
      'baseurlService',
      function($http, baseurlService) {
        var adventureOptionsPaymentService = {};
        var baseUrl = baseurlService.address;

        adventureOptionsPaymentService.model = {};
        adventureOptionsPaymentService.model._model = {};

        /**
         * model.set
         * @param {object} model
         */
        adventureOptionsPaymentService.model.set = function(model) {
          adventureOptionsPaymentService.model._model=model;
        };

        /**
         * pay
         * @param {object} data
         * @returns {callback}
         */
        adventureOptionsPaymentService.pay = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/adventures/pay",
            data: adventureOptionsPaymentService.model._model,
            headers: {
	      "Content-Type": "application/json"
            }
          });
        };

        /**
         * init
         */
        adventureOptionsPaymentService.init = function() {
          console.log("adventureOptionsPaymentService.init");
        };

        adventureOptionsPaymentService.init();

        return adventureOptionsPaymentService;
      }
    ]
  );
})(console, angular);
