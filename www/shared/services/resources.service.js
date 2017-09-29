/**
 * @fileOverview
 * @name resource.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "resourceService",
    [
      '$http',
      'baseurlService',
      function($http, baseurlService) {
        var resourceService = {};

        var baseUrl = baseurlService.address;

        /**
         * timezones
         * @returns {}
         */
        resourceService.timezones = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/resources/timezones"
          });
        };

        /**
         * subscriptions
         * @returns {}
         */
        resourceService.subscriptions = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/resources/subscriptions"
          });
        };

        return resourceService;
      }
    ]
  );
})(console, angular);
