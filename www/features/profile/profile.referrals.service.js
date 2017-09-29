/**
 * @fileOverview
 * @name profile.referrals.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "profileReferralsService",
    [
      '$http',
      function($http) {
        var profileReferralsService = {};
        return profileReferralsService;
      }
    ]
  );
})(console, angular);
