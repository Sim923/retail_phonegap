/**
 * @fileOverview
 * @name profile.messages.services.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "profileMessagesService",
    [
      '$http',
      function($http) {
        var profileMessagesService = {};

        /**
         * init
         */
        profileMessagesService.init = function() {
          console.log('profile.message.service');
        };
        profileMessagesService.init();

        return profileMessagesService;
      }
    ]
  );
})(console, angular);
