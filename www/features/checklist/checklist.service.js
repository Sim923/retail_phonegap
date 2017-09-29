/**
 * @fileOverview
 * @name checklist.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'checklistService',
    [
      '$http',
      function ($http) {
        var checklistService = {};
        return checklistService;
      }
    ]
  );
})(console, angular);
