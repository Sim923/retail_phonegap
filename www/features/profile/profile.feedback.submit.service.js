/**
 * @fileOverview
 * @name profile.details.service.js
 * @author
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'profileFeedbackSubmitService',
    [
      '$log',
      'salesService',
      function($log, salesService) {
        var profileFeedbackSubmitService = {};

        return profileFeedbackSubmitService;
      }
    ]
  );
})(console, angular);
