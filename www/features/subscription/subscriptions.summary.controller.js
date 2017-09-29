/**
 * @fileOverview
 * @name subscriptions.summary.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'subscriptions.summary.controller',
    [
      'subscriptionsSummaryService',
      function(subscriptionsSummaryService) {

        /**
         * init
         */
        var init = function() {
          console.log('subsscriptions.summary.controller');
        };

        init();

        angular.extend(
          this,
          {
          }
        );
      }
    ]
  );
})(console, angular);