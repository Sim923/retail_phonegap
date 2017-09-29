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
    'optionsService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http, baseurlService) {
        var optionsService = {};
        var baseUrl = baseurlService.address;

	/**
	 * fetchListingOptions
	 * @param {string} listingId
	 * @returns {callback} 
	 */
	optionsService.fetchListingOptions = function(listingId) {
	  return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/listings/options/" + listingId
	  });
	};
	
        /**
         * init
         */
        optionsService.init = function() {
          $log.log('optionsService.init');
        };
        optionsService.init();

        return optionsService;
      }
    ]
  );
})(angular);
