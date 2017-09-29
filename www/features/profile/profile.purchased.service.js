/**
 * @fileOverview
 * @name profile.notifications.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "profilePurchasedService",
    [
      '$state',
      'salesService',
      function($state, salesService) {
        var profilePurchasedService = {};

        /**
         * goToFeedback
         * @param {string} id
         * @returns {callback} 
         */
        profilePurchasedService.goToFeedback = function(id) {
          salesService.goToFeedback(id);
        };


        /**
         * goToRefund
         * @param {string} id
         * @returns {callback} 
         */
        profilePurchasedService.goToRefund = function(id) {
          salesService.goToRefund(id);
        };

        /**
         * goToRefund
         * @param {string} id
         * @returns {callback} 
         */
        profilePurchasedService.goToListing = function(listingId) {
          $state.go("home.item", {id:listingId});
        };


        /**
         * goToClaim
         */
        profilePurchasedService.goToClaim = function() {
          $state.go("support");
        };

        /**
         * init
         */
        profilePurchasedService.init = function() {
          console.log('profile.purchased.service');
        };
        profilePurchasedService.init();

        return profilePurchasedService;
      }
    ]
  );
})(console, angular);
