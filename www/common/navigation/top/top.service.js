/**
 * @fileOverview bottom controls service
 * @name topService.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'topService',
    [
      '$http',
      function($http) {
        var topService = {};
	
        var _refreshCallback = null;

        topService.all = {};
        topService.all._all = false;

        /**
         * all.set
         * @param {boolean} flag
         */
        topService.all.set = function(flag) {
          topService.all._all=flag;
        };

        /**
         * all.get
         */
        topService.all.get = function() {
          return topService.all._all;
        };

	topService.data = {};
	topService.data._data = {};

        /**
         * data.set
         * @param {string} property
         * @param {mixed} value
         */
	topService.data.set = function(property, value) {
	  topService.data._data[property] = value;
	};

        /**
         * data.get
         * @param {string} property
         * @returns {mixed} 
         */
	topService.data.get = function(property) {
	  return topService.data._data[property];
	};
	
        /**
         * setRefreshCallback
         * @param {function} cb
         */
        topService.setRefreshCallback = function(cb) {
          _refreshCallback = cb;
        };

        /**
         * refresh
         * @param {string} property
         * @param {object} value
         */
        topService.refresh = function(property, value) {
          console.log(property, value);
          if (_refreshCallback) {
	    topService.data.set(property, value);
            _refreshCallback(property, value);
          } else {
            console.log('_refreshCallback not set');
          }
        };
	
        return topService;
      }
    ]
  );
})(console, angular);
