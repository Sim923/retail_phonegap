/**
 * @fileOverview login view controller
 * @name login.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'login.controller',
    [
      '$log',
      '$state',
      'deviceService',
      'loginService',
      function($log, $state, deviceService, loginService) {
        var username = "";
        var password = "";
	var error="";
	var $this=this;
	
        /**
         * reset
         */
        var reset = function() {
          $state.transitionTo('login.recovery');
        };

        /**
         * register
         */
        var register = function() {
          $state.go('register-quick');
        };

        /**
         * login
         */
        var login = function() {
          loginService.login(
            this.username,
            this.password
          ).then(
            function(data) {
	      console.log(data);
              deviceService.setRegistered();
              $state.go('home');
            },
	    function(data) {
	      console.log(data);
	      $this.error="Invalid username or password.";
	      error="Invalid username or password.";
	    }
          );
        };
	
        /**
         * isLoggedIn
         * @returns {boolean}
         */
        var isLoggedIn = function() {
          return loginService.isLoggedIn();
        };

        /**
         * init
         */
        var init = function() {
          $log.log('login.controller.init');
        };
	
        init();

        angular.extend(this, {
	  error:error,
          username:username,
          password:password,
          login:login,
          reset:reset,
          register:register,
          isLoggedIn:isLoggedIn
        });
      }
    ]
  );
})(console, angular);
