/**
 * @fileOverview Primary-level ui-routes configuration
 * @name login.routes.js
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
            name: 'login',
            url: '/login',
            parent:'',
            data : {
              status : 'login'
            },
            views : {
              'content@':{
                templateUrl:'features/login/login.html',
                controller:'login.controller',
                controllerAs:'lc'
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
