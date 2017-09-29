/**
 * @fileOverview Main AngularJS Application Services for Reeltrail application
 * @name category.services.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'optionsPricesService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http, baseurlService) {
        var optionsPricesService = {};
        optionsPricesService.prices = {};
        optionsPricesService.prices._prices = {};

        var baseUrl = baseurlService.address;

        /**
         * load
         * @returns {callback}
         */
        optionsPricesService.prices.fetch = function() {
          return $http({
            method: 'GET',
            url: baseUrl+'/rtapi/v1/listings/options/prices',
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        optionsPricesService.prices.load = function() {
          optionsPricesService.prices.fetch().then(
            function(resp) {
              optionsPricesService.prices.set(resp.data);
            },
            function(resp) {
              console.dir(resp.data);
            }
          );
        };

        /**
         * set
         * @param {object} prices
         */
        optionsPricesService.prices.set = function(prices) {
          optionsPricesService.prices._prices = prices;
        };

        /**
         * get
         * @returns {array}
         */
        optionsPricesService.prices.get = function() {
          return optionsPricesService.prices._prices;
        };

        /**
         * init
         */
        optionsPricesService.init = function() {
          $log.log('optionsPricesService.init');
        };
        optionsPricesService.init();

        return optionsPricesService;
      }
    ]
  );
})(angular);
