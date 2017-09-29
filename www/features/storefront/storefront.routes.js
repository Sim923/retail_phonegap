/**
 * @fileOverview Primary-level ui-routes configuration
 * @name storefront.routes.js
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
              name: 'storefront',
              url: '/storefront',
              parent:'',
              data : {
                status : 'storefront'
              },
              views : {
                'content@':{
                  templateUrl:'features/storefront/storefront.html',
                  controller:'storefront.controller',
                  controllerAs:'sf'
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
  