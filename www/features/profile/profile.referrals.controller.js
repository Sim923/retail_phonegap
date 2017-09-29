/**
 * @fileOverview
 * @name profile.referrals.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "profile.referrals.controller",
    [
      'profileReferralsService',
      function(profileReferralsService) {
        /**
         * init
         */
        var init = function() {
          console.log('profile.referrals.controller.init');
          // profileSidebarService.select('referrals');
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
