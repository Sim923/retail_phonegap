/**
 * @fileOverview Primary-level ui-routes configuration
 * @name app.routes.js
 * @author Matthew Aaron Raymer
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'cart.success.controller',
    [
      '$log',
      '$state',
      'cart',
      function($log, $state, cart) {

        var items = angular.copy(cart.data);

        /**
         * empty
         * @returns {boolean} 
         */
        var empty = function() {
          return Object.keys(items).length===0;
        };

        var init = function() {
          $log.log('cart.success.controller.init');
        };

        init();

        angular.extend(this, {
          cart:items,
          empty:empty
        });
      }
    ]
  );
})(console, angular);
