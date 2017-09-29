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
    'profileFeedbackService',
    [
      '$log',
      'feedbackService',
      '$q',
      function($log, feedbackService, $q) {
        var profileFeedbackService = {};

        profileFeedbackService.user = function() {
          return $q(function(resolve, reject) {
            feedbackService.user().then(
              function(resp) {
                resolve({status:false, data:resp.data});
              },
              function(resp) {
                reject({status:false, data:[]});
              }
            );
          });
        };

        return profileFeedbackService;
      }
    ]
  );
})(console, angular);
