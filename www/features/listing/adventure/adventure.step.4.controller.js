/**
 * @fileOverview
 * @name adventure.step.4.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'adventure.step.4.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'categories',
      'adventuresOptionsPrices',
      'adventureService',
      'categoryService',
      function($log, $state, $timeout, categories, adventuresOptionsPrices, adventureService, categoryService) {
        var model = adventureService.model.get();
        console.log('adventure.step4.model', model);
	var agreeListingOptionsNoRefund=false;

  var $this = this;
  $this.activeview = 4;

        /**
         * back
         */
        var back = function() {
          adventureService.model.set(model, "internal"); // flag is set to prevent dividing the number by 100
          $state.go('adventure-wizard.step3');
        };

        /**
         * list
         */

        /**
         * save
         */
        var list = function($event) {
          console.log('adventure.step4.controller.save', $this.model);
          if (typeof($event.$material)==="undefined") {
            var category = categoryService.categories.id("5", model.category1, model.category2);
            model.mainCategory = category.main;
            model.subcategory1 = category.sub;
            model.subcategory2 = category.subsub;
            adventureService.model.set($this.model, 'save');
            console.log('adventureService.model.get()', adventureService.model.get());
            adventureService.create().then(
              function(resp) {
                console.log(resp);
                adventureService.model.set($this.model, "internal"); // flag is set to prevent dividing the number by 100
                adventureService.id.set(resp.data.adventure._id);
                $state.go('adventure-wizard.options');
              },
              function(resp) {
                console.log(resp);
              }
            );
          }
        };

        /**
         * init
         */
        var init = function() {
          $log.log('adventure.controller.init');
        };

        init();

        Object.keys(adventuresOptionsPrices.data).map(function(key, index) {
          if (angular.isObject(adventuresOptionsPrices.data[key])) {
            adventuresOptionsPrices.data[key].price *= 0.01;
          }
        });

        /**
         * Exports
         */
        angular.extend(this, {
	  agreeListingOptionsNoRefund:agreeListingOptionsNoRefund,
          model:model,
          categories:categories,
          adventuresOptionsPrices:adventuresOptionsPrices.data,
          back:back,
          list:list
        });
      }
    ]
  );
})(console, angular);
