/**
 * @fileOverview
 * @name subscriptions.summary.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
   'use strict';
   var RTMobileApp = angular.module('RTMobileApp');
   RTMobileApp.factory(
     'subscriptionsSummaryService',
     [
       '$http',
       function($http) {
         var subscriptionsSummaryService = {};
         return subscriptionsSummaryService;
       }
     ]
   );
})(console, angular);