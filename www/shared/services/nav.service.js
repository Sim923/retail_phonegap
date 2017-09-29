/**
 * @fileOverview
 * @name nav.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "navService",
    [
      "$http",
      '$timeout',
      function ($http, $timeout) {
        var navService = {};

        var _refreshCallback = null;

        navService.updatedCartCount = 0;
        navService.updatedNotifCount = 0;

        navService.setCartCount = function(cartCount){
          navService.updatedCartCount = cartCount;
        };

        navService.getCartCount = function(){
          return navService.updatedCartCount;
        };

        navService.setNotifCount = function(notifCount){
          console.log('notifCount', notifCount);
          navService.updatedNotifCount = notifCount;
        };

        navService.getNotifCount = function(){
          return navService.updatedNotifCount;
        };

        /**
         * setRefreshCallback
         * @param {function} cb
         */
        navService.setRefreshCallback = function(cb) {
          _refreshCallback = cb;
        };

        /**
         * refresh
         * @param {string} property
         * @param {object} value
         */
        navService.refresh = function(property, value) {
          console.log(property, value);
          if (_refreshCallback) {
            _refreshCallback(property, value);
          } else {
            console.log('_refreshCallback not set');
          }
        };

        return navService;
      }
    ]
  );
})(console, angular);
