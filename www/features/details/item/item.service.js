/**
 * @fileOverview item detail service
 * @name itemService.js
 * @author Matthew Aaron Raymer (matthew.raymer@anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'itemDetailService',
    [
      '$http',
      'cartService',
      function($http, cartService) {
        var itemService = {};
        itemService.hello = function() {
          console.log('howdy from itemService!');
        };
        itemService.id = {};
        itemService.id._id='';
        itemService.id.set = function(id) {
          itemService.id._id=id;
        };
        itemService.id.get = function() {
          return itemService.id._id;
        };
        itemService.fetch = function(){
        };
        itemService.cart = {};
        itemService.cart.item = {};
        itemService.cart.add = function() {
        };
        return itemService;
      }
    ]
  );
})(angular);