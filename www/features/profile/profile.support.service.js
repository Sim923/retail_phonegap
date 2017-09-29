/**
 * @fileOverview
 * @name profile.support.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'profileSupportService',
    [
      '$log',
      '$http',
      '$q',
      function($log, $http, $q) {
        var profileSupportService = {};
        return profileSupportService;
      }
    ]
  );
})(console, angular);