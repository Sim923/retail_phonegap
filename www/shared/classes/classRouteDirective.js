/**
 * @fileOverview
 * @name classRouteDirective.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function () {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.directive('classRoute', function($rootScope, $state) {
    return function(scope, elem, attr) {
      var previous = '';
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.name==='login') {
          attr.$addClass('fullscreen');
        } else if (fromState.name==='login') {
          attr.$removeClass('fullscreen');
        }
      });
    };
  });
})();
