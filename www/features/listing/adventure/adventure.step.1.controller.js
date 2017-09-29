/**
 * @fileOverview
 * @name adventure.step.1.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'adventure.step.1.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'categories',
      'categoryService',
      'adventureService',
      function($log, $state, $timeout, categories, categoryService, adventureService) {
          var model = adventureService.model.get();
          var $this = this;
    console.log('adventure.step.1.controller', model);
        $this.activeview = 1;

        /**
         * next
         */
        var next = function() {
          var category = categoryService.categories.id("5", model.category1, model.category2);
          model.mainCategory = category.main;
          model.subcategory1 = category.sub;
          model.subcategory2 = category.subsub;
          adventureService.model.set(model, 'internal');
          $state.go('adventure-wizard.step2');
        };

        /**
         * init
         */
        var init = function() {
          $log.log('adventure.step.1.controller.init');
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
