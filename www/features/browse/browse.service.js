/**
 * @fileOverview item detail service
 * @name browseService.js
 * @author Matthew Aaron Raymer (matthew.raymer@anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'browseService',
    [
      '$http',
      function($http) {
        var browseService = {};
        browseService.tabs = {};
        browseService.tabs.selected = 0;
        return browseService;
      }
    ]
  );
})(angular);