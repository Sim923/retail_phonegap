/**
 * @fileOverview
 * @name subscriptions.successful.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
   'use strict';
   var RTMobileApp = angular.module('RTMobileApp');
   RTMobileApp.factory(
     'subscriptionsSuccessfulService',
     [
       '$http',
       function($http) {
         var subscriptionsSuccessfulService = {};
         return subscriptionsSuccessfulService;
       }
     ]
   );
})(console, angular);