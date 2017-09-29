/**
 * @fileOverview
 * @name classRouteDirective.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function () {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.directive('convertToNumber', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
	ngModel.$parsers.push(function(val) {
	  return val !== null ? parseInt(val, 10) : null;
	});
	ngModel.$formatters.push(function(val) {
	  return val !== null ? '' + val : null;
	});
      }
    };
  });
  
})();
