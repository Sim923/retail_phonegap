/**
 * @fileOverview Primary-level ui-routes configuration
 * @name recovery.routes.js
 * @author Matthew Aaron Raymer
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.config(
    [
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        var states = [
          {
            name: 'login.recovery',
            url: '^/login/recovery',
            views : {
              'content@':{
                templateUrl:'features/recovery/01.email.enter.html',
                controller:'recovery.enter.controller',
                controllerAs:"rec"
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
                controller:'top.controller',
                controllerAs:'tc'
              }
            }
          }, {
            name: 'login.recovery.check',
            url: '^/recovery/check',
            views : {
              'content@':{
                templateUrl:'features/recovery/02.email.check.html',
                controller:'recovery.check.controller',
                controllerAs:"rcc"
              }
            }
          }, {
            name: 'login.recovery.new',
            url: '^/recovery/new',
            views : {
              'content@':{
                templateUrl:'features/recovery/03.password.new.html',
                controller:'recovery.new.controller',
                controllerAs:"rnc"
              }
            }
          }, {
            name: 'login.recovery.success',
            url: '^/recovery/success',
            views : {
              'content@':{
                templateUrl:'features/recovery/04.password.success.html',
                controller:'recovery.success.controller',
                controllerAs:"rsc"
              }
            }
          }
        ];
	for (var i=0; i<states.length; i++) {
	  $stateProvider.state(states[i]);
	}
      }
    ]
  );
})(console, angular);
