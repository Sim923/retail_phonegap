/**
 * @fileOverview item view controller
 * @name item.step.5.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'item.step.5.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'categories',
      'optionsPrices',
      'itemService',
      'categoryService',
      function($log, $state, $timeout, categories, optionsPrices, itemService, categoryService) {
        var model = itemService.model.get();
        var prices = {};
  var agreeListingOptionsNoRefund=false;
  var $thisitem = this;
  $thisitem.activeview = 5;
        /**
         * back
         */
        var back = function() {
          itemService.model.set(model, 'internal');
          $state.go('item-wizard.step4');
        };

        /**
         * list
         */
        var list = function($event) {
          console.log($event);
          if (typeof($event.$material)==="undefined") {
            var category = categoryService.categories.id(model.category0, model.category1, model.category2);
            console.log('category',category);
            model.mainCategory = category.main;
            model.subcategory1 = category.sub;
            model.subcategory2 = category.subsub;
            itemService.model.set(model, 'internal');

            itemService.create().then(
              function(resp) {
                itemService.id.set(resp.data.listing._id);
                var opts = resp.data.listing.options;
                var destination = opts.highlight || opts.viewCounter || opts.boldface || opts.showcase;
                if (destination) {
		  return $state.go("item-wizard.options");
                } else {
		  return $state.go("profile.items");
	        }
              },
              function(resp) {
                console.log('error saving', resp);
              }
            );
          }
        };

        /**
         * init
         */
        var init = function() {
          var p = optionsPrices.data;
          if (p.showcase) {
            prices.showcase = (p.showcase.price/100).toFixed(2);
            prices.boldface = (p.boldface.price/100).toFixed(2);
            prices.viewCounter = (p.viewCounter.price/100).toFixed(2);
            prices.highlight = (p.highlight.price/100).toFixed(2);
          }
          $log.log('item.step.5.controller.init');
        };
        init();

        /**
         * Exports
         */
        angular.extend(this, {
	  agreeListingOptionsNoRefund:agreeListingOptionsNoRefund,
          model:model,
          categories:categories,
          optionsPrices:optionsPrices.data,
          back:back,
          list:list,
          prices:prices
        });
      }
    ]
  );
})(console, angular);
