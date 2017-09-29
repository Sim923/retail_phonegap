/**
 * @fileOverview
 * @name taxes.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module("RTMobileApp");
  RTMobileApp.service(
    "taxesService",
    [
      '$http',
      'baseurlService',
      function($http, baseurlService) {
        var taxesService = {};

        var baseUrl = baseurlService.address;

        taxesService.items = {};
        taxesService.items._items = {};

        /**
         * items.set
         * @param {object} items
         */
        taxesService.items.set = function(items) {
          taxesService.items._items=angular.copy(items);
        };

        /**
         * items.get
         * @returns {object} 
         */
        taxesService.items.get = function() {
          return angular.copy(taxesService.items._items);
        };

        /**
         * calculate
         * @param {array} items
         * @param {object} destination
         * @returns {callback} 
         */
        taxesService.calculate = function(items, destination) {
          return $http({
            url:baseUrl+"/rtapi/v1/taxes",
            method:"POST",
            data:{
              items:items,
              destination:destination
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * fetch
         * @param {string} saleId
         * @returns {callback} 
         */
        taxesService.fetch = function(saleId) {
          return $http({
            url:baseUrl+"/rtapi/v1/taxes/" + saleId,
            method:"GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * init
         */
        taxesService.init = function()  {
          console.log('taxes.service.init');
        };

        taxesService.init();

        return taxesService;
      }
    ]
  );
})(console, angular);
