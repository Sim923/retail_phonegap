/**
 * @fileOverview register view controller
 * @name profile.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'profile.controller',
    [
      '$log',
      '$window',
      '$state',
      'user',
      'average',
      'userService',
      'notificationsService',
      'profileService',
      function($log, $window, $state, user, average, userService, notificationsService, profileService) {
        var oUser=userService.model.get();
        console.log('oUser', oUser);
        var data = {};
  data.notificationCount = notificationsService.count.get();  
        profileService.model.set(oUser);
  
        var model = profileService.model.get();
        model.average = average.data.average;
        model.reviews = average.data.reviews;
  var $this = this;
  
        /**
         * logout
         */
        var logout = function() {
          $window.localStorage.removeItem('token');
          $state.go('home');
        };

        var profile = {};

        profile.watchlist = function() {
          console.log('profile.watches');
          $state.go('profile.watches');
        };

        profile.items = function() {
          console.log('profile.items');
          $state.go('profile.items');
        };

        profile.adventures = function() {
          console.log('profile.adventures');
          $state.go('profile.adventures');
        };

        profile.details = function() {
          console.log('profile.details');
          $state.go('profile.details');
        };

        profile.subscription = function() {
          console.log('profile.subscription');
          $state.go('profile.subscription');
        };

        profile.address = function() {
          console.log('profile.address');
          $state.go('profile.address');
        };
        profile.referrals = function() {
          console.log('profile.referrals');
          $state.go('profile.referrals');
        };
        profile.sellerSettings = function() {
          console.log('profile.seller-settings');
          $state.go('profile.seller-settings');
        };

        profile.notifications = function(){
          console.log('profile.notifications');
          $state.go('profile.notifications');
        };

        profile.feedback = function() {
          console.log('profile.feedback');
          $state.go('profile.feedback');
        };

        profile.sales = function() {
          console.log('profile.sales');
          $state.go('profile.sales');
        };

        profile.purchased = function() {
          console.log('profile.purchased');
          $state.go('profile.purchased');
        };

        profile.support = function() {
          console.log('profile.support');
          $state.go('profile.support');
        };

        profile.about = function(){
          console.log('profile.about');
          $state.go('profile.about');
        }

        profile.appsetting = function(){
          console.log('profile.appsetting');
          $state.go('profile.appsetting');
        }

        profile.paymentmethod = function(){
          console.log('profile.payment-method');
          $state.go('profile.payment-method');
        }

        /**
         * refresh
         * @param {string} property
         * @param {object} value
         */
        var refresh = function(property, value) {
          $this.data[property] = value;
          data[property] = value;
        };
  
        /**
         * init
         */
        var init = function() {
          $log.log('profile.controller.init');
          profileService.setRefreshCallback(refresh);
        };
  
        init();

        angular.extend(this, {
          model:model,
          profile:profile,
          logout:logout,
          data:data
        });
      }
    ]
  );
})(console, angular);
