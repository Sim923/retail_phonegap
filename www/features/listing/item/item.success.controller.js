/**
 * @fileOverview item view controller 
 * @name item.success.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'item.success.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'itemService',
      'categories',
      function($log, $state, $timeout, itemService, categories) {
        var model = itemService.model.get();

        /**
         * newItem
         */
        var newItem = function() {
          itemService.model.reset();
          $state.go('item-wizard');
        };

        /**
         * profile
         */
        var profile = function() {
          $state.go('profile');
        };

        /**
         * browse
         */
        var browse = function() {
          $state.go('home');
        };

        /**
         * init
         */
        var init = function() {
          $log.log('item.success.controller.init');
        };
        init();
        angular.extend(this, {
          model:model,
          categories:categories,
          newItem:newItem,
          browse:browse,
          profile:profile
        });
      }
    ]
  );
})(angular);
