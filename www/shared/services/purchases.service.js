/**
 * @fileOverview
 * @name purchases.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');

  RTMobileApp.factory(
    "purchasesService",
    [
      '$http',
      '$location',
      'baseurlService',
      function($http, $location, baseurlService) {
        var purchasesService = {};

        var baseUrl = baseurlService.address;

        /**
         * user
         * @returns {callback} 
         */
        purchasesService.user = function() {
          return $http(
            {
              method:'GET',
              url:baseUrl+'/rtapi/v1/purchases/user/'
            }
          );
        };

        /**
         * goToListing
         * @param {string} id
         * @returns {callback} 
         */
        purchasesService.goToListing = function(id) {
          return $location.path("/listings/" + id);
        };

        /**
         * init
         */
        purchasesService.init = function() {
          console.log("purchases.service.init");
        };
        return purchasesService;
      }
    ]
  );
})(console, angular);