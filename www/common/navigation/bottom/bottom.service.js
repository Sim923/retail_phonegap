/**
 * @fileOverview bottom controls service
 * @name bottomService.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function () {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'bottomService',
    [
      '$http',
      function($http) {
        var bottomService = {};

        bottomService.visible = true;
	
        bottomService.selected = {};
        bottomService.selected._selected = '';

        bottomService.selected.set = function(pane) {
          bottomService.selected._selected = pane;
        };
	
        bottomService.selected.get = function() {
          return bottomService.selected._selected;
        };

        var _refreshCallback = null;
	bottomService.data = {};
	bottomService.data._data = {};

	bottomService.data.set = function(property, value) {
	  bottomService.data._data[property] = value;
	};

	bottomService.data.get = function(property) {
	  return bottomService.data._data[property];
	};
	
        /**
         * setRefreshCallback
         * @param {function} cb
         */
        bottomService.setRefreshCallback = function(cb) {
          _refreshCallback = cb;
        };

        /**
         * refresh
         * @param {string} property
         * @param {object} value
         */
        bottomService.refresh = function(property, value) {
          console.log(property, value);
          if (_refreshCallback) {
	    bottomService.data.set(property, value);
            _refreshCallback(property, value);
          } else {
            console.log('_refreshCallback not set');
          }
        };
	
        return bottomService;
      }
    ]
  );
})();
