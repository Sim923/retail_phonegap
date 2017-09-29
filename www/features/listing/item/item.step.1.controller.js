/**
 * @fileOverview item view controller
 * @name item.step.1.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'item.step.1.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'categories',
      'categoryService',
      'itemService',
      'item',
      function($log, $state, $timeout, categories, categoryService, itemService, item) {
        var $thisitem = this;
        $thisitem.activeview = 1;

        var model = itemService.model.get();
        console.log(model);
        /**
         * next
         */
        var next = function() {
          var category = categoryService.categories.id(model.category0, model.category1, model.category2);
          model.mainCategory = category.main;
          model.subcategory1 = category.sub;
          model.subcategory2 = category.subsub;
          itemService.model.set(model, 'internal');
          $state.go('item-wizard.step2');
        };

        /**
         * init
         */
        var init = function() {
          $log.log('item.step.1.controller.init');
        };
        init();

        /**
         *  Exports
         */
        angular.extend(this, {
          model:model,
          categories:categories.data,
          next:next
        });
      }
    ]
  );
})(console, angular);
