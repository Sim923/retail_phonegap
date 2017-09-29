/**
 * @fileOverview
 * @name top.item.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'top.item.controller',
    [
      '$state',
      function($state) {
        var init = function() {
          console.log('top.item.controller.init');
        };
        init();
      }
    ]
  );
})(console, angular);
