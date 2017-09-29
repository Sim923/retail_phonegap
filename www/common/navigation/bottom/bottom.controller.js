/**
 * @fileOverview bottom navigation panel controller
 * @name bottom.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'bottom.controller',
    [
      '$state',
      'bottomService',
      function($state, bottomService) {
        /**
         *  Private
         */

        var data = {};

        data.notificationCount = 0;
        data.messagesCount = 0;

        var $this=this;
      
        $this.step = 1;    

        
        console.log($this.step+" ---- ----------------------");
        var makeactive = function(value) {
          window.localStorage.setItem("tab", value);
          var _value = window.localStorage.getItem("tab");
          $this.step = _value;
          console.log($this.step+" ---- "+_value);
        }
	
        /**
         *  Public 
         */
        var status = '';

        var isVisible = function() {
          return bottomService.visible;
        };

        /**
         * home
         */
        var home = function() {
          $state.go('home');
        };

        /**
         * search
         */
        var search = function() {
          $state.go('search');
        };

        /**
         * sellLanding
         */
        var sellLanding = function() {
          $state.go('sell-landing');
        };

        /**
         * messaging
         */
        var messaging = function() {
          $state.go('messaging');
        };

        /**
         * action
         */
        var action = function() {
          $state.go('action');
        };

        /**
         * refresh
         * @param {string} property
         * @param {object} value
         */
        var refresh = function(property, value) {
	  console.log("bottom.controller.refresh", property, value);
          $this.data[property] = value;
          data[property] = value;
        };
	
        /**
         * init
         */
        var init = function() {
          console.log('bottom.controller.init');
          console.log($state.current.data);
          status=$state.current.data.status;
          bottomService.setRefreshCallback(refresh);
          data.notificationCount = bottomService.data.get("notificationCount");
          data.messagesCount = bottomService.data.get("messagesCount");
          $this.step = window.localStorage.getItem("tab");
        };

	init();
	
        /**
         * Exports
         */

        angular.extend(this, {
          isVisible:isVisible,
	  data:data,
          status:status,
          home:home,
          search:search,
          sellLanding:sellLanding,
          messaging:messaging,
          action:action,
          makeactive:makeactive
        });
      }
    ]
  );
})(console, angular);
