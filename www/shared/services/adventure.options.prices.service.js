/**
 * @fileOverview Main AngularJS Application Services for Reeltrail application
 * @name adventure.options.prices.services.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'adventuresOptionsPricesService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http, baseurlService) {
        var adventuresOptionsPricesService = {};
        adventuresOptionsPricesService.prices = {};
        adventuresOptionsPricesService.prices._prices = {};

        var baseUrl = baseurlService.address;

        /**
         * load
         * @returns {callback}
         */
        adventuresOptionsPricesService.prices.fetch = function() {
          return $http({
            method: 'GET',
            url: baseUrl+'/rtapi/v1/adventures/options/prices'
          });
        };

        adventuresOptionsPricesService.prices.load = function() {
          adventuresOptionsPricesService.prices.fetch().then(
            function(resp) {
              adventuresOptionsPricesService.prices.set(resp.data);
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
        adventuresOptionsPricesService.prices.set = function(prices) {
          adventuresOptionsPricesService.prices._prices = prices;
        };

        /**
         * get
         * @returns {array}
         */
        adventuresOptionsPricesService.prices.get = function() {
          return adventuresOptionsPricesService.prices._prices;
        };

        /**
         * init
         */
        adventuresOptionsPricesService.init = function() {
          $log.log('adventuresOptionsPricesService.init');
        };
        adventuresOptionsPricesService.init();

        return adventuresOptionsPricesService;
      }
    ]
  );
})(angular);
