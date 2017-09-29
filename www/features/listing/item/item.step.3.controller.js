/**
 * @fileOverview item view controller 
 * @name item.step.3.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'item.step.3.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'itemService',
      'countries',
      'categories',
      function($log, $state, $timeout, itemService, countries, categories) {
        var model = itemService.model.get();
        var $thisitem = this;
        $thisitem.activeview = 3;
        /**
         * back
         */
        var back = function() {
          itemService.model.set(model, 'internal');
          $state.go('item-wizard.step2');
        };

        /**
         * next
         */
        var next = function() {
          $log.log('item.step.3.controller.next');
          itemService.model.set(model, 'internal');
          $state.go('item-wizard.step4');
        };

        /**
         * init
         */
        var init = function() {
          $log.log('item.step.3.controller.init');
        };
        init();

        // Exports

        angular.extend(this, {
          model:model,
          countries:countries.data,
          categories:categories,
          next:next,
          back:back
        });
      }
    ]
  );
})(angular);
