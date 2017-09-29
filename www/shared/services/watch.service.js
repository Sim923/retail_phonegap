/**
 * @fileOverview register service
 * @name item.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'watchesService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http, baseurlService) {

        var watchesService = {};

        var baseUrl = baseurlService.address;

        watchesService.fetch = {};

        /**
         * add
         * @param {string} listingId
         * @returns {callback} 
         */
        watchesService.add = function(listingId) {
          var config = {
            method: "POST",
            data : {
              listingId:listingId
            },
            url: baseUrl+"/rtapi/v1/watches/"
          };
          return $http(config);
        };

        /**
         * remove
         * @param {string} watchId
         * @returns {callback} 
         */
        watchesService.remove = function(watchId) {
          var config = {
            method: "DELETE",
            data : {
              watchId:watchId
            },
            url: baseUrl+"/rtapi/v1/watches/"
          };
          return $http(config);
        };

        /**
         * fetch.user
         * @returns {callback} 
         */
        watchesService.fetch.user = function() {
          var config = {
            method: "GET",
            url: baseUrl+"/rtapi/v1/watches/"
          };
          return $http(config);
        };

        /**
         * fetch.listing
         * @param {string} listingId
         * @returns {callback} 
         */
        watchesService.fetch.listing = function(listingId) {
          var config = {
            method: "GET",
            url: baseUrl+"/rtapi/v1/watches/"+listingId
          };
          return $http(config);
        };

        /**
         * fetch.count
         * @param {string} listingId
         * @returns {callback} 
         */
        watchesService.fetch.count = function(listingId) {
          var config = {
            method: "GET",
            url: baseUrl+"/rtapi/v1/watches/count/"+listingId
          };
          return $http(config);
        };

        watchesService.fetch.status = function(listingId) {
          var config = {
            method: "GET",
            url: baseUrl+"/rtapi/v1/watches/status/"+listingId
          };
          return $http(config);
        };
	
        /**
         * init
         */
        watchesService.init = function() {
          console.log('watchesService.init');
        };

        watchesService.init();

        return watchesService;
      }
    ]
  );
})(console, angular);
