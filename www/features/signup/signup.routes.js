/**
 * @fileOverview Primary-level ui-routes configuration
 * @name signup.routes.js
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
              name: 'signup',
              url: '/signup',
              parent:'',
              data : {
                status : 'signup'
              },
              views : {
                'content@':{
                  templateUrl:'features/signup/signup.html',
                  controller:'signup.controller',
                  controllerAs:'lc'
                },
                    'topNav@':{
                    templateUrl:'common/navigation/top/top.html',
                    controller:'top.controller',
                    controllerAs:'tc'
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