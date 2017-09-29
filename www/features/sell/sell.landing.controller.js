/**
 * @fileOverview sell landing controller 
 * @name sell.landing.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function () {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'sell.landing.controller',
    [
      '$log',
      '$state',
      'sellLandingService',
      function($log, $state, sellLandingService) {
        var slc = this;
        /**
         * sell
         */
        slc.sell = function() {
          $log.log('sell');
          $state.go('/item', {reset:true});
        };
        /**
         * post
         */
        slc.post = function() {
          $log.log('adventure');
          $state.transitionTo('adventure-wizard', {reset:true});
        };
        /**
         * init
         */
        slc.init = function() {
          $log.log('sell.landing.controller.init');
        };
        slc.init();
      }
    ]
  );
})();