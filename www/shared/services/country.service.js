/**
 * @fileOverview Main AngularJS Application Services for Reeltrail application
 * @name country.services.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function () {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'countryService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http, baseurlService) {
        var countryService = {};
        countryService.countries = {};
        countryService.countries._countries = {};

        var baseUrl = baseurlService.address;

        /**
         * load
         * @returns {callback}
         */
        countryService.countries.fetch = function() {
          return $http({
            method: 'GET',
            url: baseUrl+'/rtapi/v1/resources/countries'
          });
        };

        countryService.countries.load = function() {
          countryService.country.fetch().then(
            function(resp) {
              countryService.countries.set(resp.data);
            },
            function(resp) {
              console.dir(resp.data);
            }
          );
        };

        /**
         * set
         * @param {array} countries
         */
        countryService.countries.set = function(countries) {
          countryService.countries._countries = countries;
        };

        /**
         * get
         * @returns {array} 
         */
        countryService.countries.get = function() {
          return countryService.countries._countries;
        };

        /**
         * init
         */
        countryService.init = function() {
          $log.log('countryService.init');
        };
        countryService.init();

        return countryService;
      }
    ]
  );
})();
