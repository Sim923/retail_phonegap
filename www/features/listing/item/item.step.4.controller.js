/**
 * @fileOverview item view controller
 * @name item.step.4.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'item.step.4.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'categories',
      'itemService',
      function($log, $state, $timeout, categories, itemService) {
        var $thisitem = this;
        $thisitem.activeview = 4;
	
        var model = itemService.model.get();
	var returns = [
	  {value:0, text:"No Returns"},
	  {value:3, text:"3 Days"},
	  {value:4, text:"4 Days"},
	  {value:5, text:"5 Days"},
	  {value:6, text:"6 Days"},
	  {value:7, text:"7 Days"},
	  {value:8, text:"8 Days"},
	  {value:9, text:"9 Days"},
	  {value:10, text:"10 Days"},
	  {value:11, text:"11 Days"},
	  {value:12, text:"12 Days"},
	  {value:13, text:"13 Days"},
	  {value:14, text:"14 Days"}
	];

        var $this=this;
	
        /**
         * back
         */
        var back = function() {
          itemService.model.set(model, 'internal');
          $state.go('item-wizard.step3');
        };

        /**
         * next
         */
        var next = function() {
          itemService.model.set(model, 'save');
          console.log('item model set: ', itemService.model.get());
          $state.go('item-wizard.step5');
        };

        /**
         * init
         */
        var init = function() {
          $log.log('item.controller.init');
        };
        init();

        /**
         * Exports
         */
        angular.extend(this, {
          model:model,
	  returns:returns,
          categories:categories,
          back:back,
          next:next
        });
      }
    ]
  );
})(angular);
