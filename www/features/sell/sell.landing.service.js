/**
 * @fileOverview sell landing service
 * @name sellLandingService.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function () {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'sellLandingService',
    [
      '$http',
      function($http) {
        var sellLandingService = {};
        return sellLandingService;
      }
    ]
  );
})();