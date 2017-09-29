/**
 * @fileOverview
 * @name messages.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "messagesService",
    [
      '$http',
      'rtsocket',
      'baseurlService',
      function($http, rtsocket, baseurlService) {

        var messagesService = {};

        var baseUrl = baseurlService.address;

        /**
         * user
         * @returns {callback}
         */
        messagesService.user = function() {
          return $http({
            url:baseUrl+'/rtapi/v1/messaging/user',
            method:'GET'
          });
        };

        /**
         * init initialize the Reeltrail message service
         */
        messagesService.init = function() {
	  console.log("messagesService.init");
        };

        messagesService.init();

        return messagesService;
      }
    ]
  );
})(console, angular);
