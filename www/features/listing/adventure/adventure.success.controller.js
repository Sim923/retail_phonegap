/**
 * @fileOverview
 * @name adventure.success.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license  UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'adventure.success.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'adventureService',
      'categories',
      function($log, $state, $timeout, adventureService, categories) {
        var model = adventureService.model.get();

        /**
         * newAdventure
         */
        var newAdventure = function() {
          adventureService.model.reset();
          $state.go('adventure-wizard');
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
          $log.log('adventure.success.controller.init');
        };

        init();

        angular.extend(this, {
          model:model,
          categories:categories,
          newAdventure:newAdventure,
          browse:browse,
          profile:profile
        });
      }
    ]
  );
})(console, angular);
