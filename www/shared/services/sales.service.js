/**
 * @fileOverview
 * @name sales.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "salesService",
    [
      '$state',
      '$http',
      '$location',
      'baseurlService',
      function($state, $http, $location, baseurlService) {
        var salesService = {};
        salesService.model = {};
        salesService.model._model = {};

        var baseUrl = baseurlService.address;

        salesService.model.set = function(model) {
          for(var key in model) {
            salesService.model._model[key] = model[key];
          }
        };

        salesService.model.get = function() {
          return salesService.model._model;
        };

        salesService.addresses = {};
        /**
         * addresses.update
         * @param {object} addresses
         * @returns {callback}
         */
        salesService.addresses.update = function(id, addresses) {
          return $http(
            {
              method:'PUT',
              url:baseUrl+'/rtapi/v1/sales/addresses',
              data: {
                saleId:id,
                addresses:addresses
              },
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
        };

        /**
         * fetch
         * @returns {callback}
         */
        salesService.fetch = function() {
          return $http(
            {
              method:'GET',
              url:baseUrl+'/rtapi/v1/sales',
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
        };

        /**
        * goToRefund
        * @param {string} id
        * @returns {callback}
        */
       salesService.goToRefund = function(id) {
         console.log('saleservice gotorefund id: ', id);
         $state.go("profile.refund", {
           id: id
         });
       };

        /**
         * get
         * @param {string} id
         */
        salesService.get = function(id) {
          return $http(
            {
              method:'GET',
              url:baseUrl+'/rtapi/v1/sales/'+id,
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
        };

        /**
         * goToFeedback
         * @param {string} id
         * @returns {callback}
         */
        salesService.goToFeedback = function(id) {
          $state.go("profile.feedback.submit", {
            id: id
          });
        };

        /**
         * goToShipping
         * @param {string} id
         * @returns {callback}
         */
        salesService.goToShipping = function(id) {
          $state.go("profile.shipping.submit", {
            id: id
          });
        };

        return salesService;
      }
    ]
  );
})(console, angular);
