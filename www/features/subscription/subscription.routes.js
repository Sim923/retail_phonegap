/**
 * @fileOverview register service
 * @name service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
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
            name: 'profile.subscription.select',
            url: '^/profile/subscription/select',
            data : {
              status : 'profile'
            },
            resolve: {
              user : [
                'userService',
                function(userService) {
                  console.log('resolve.user');
                  return userService.details().then(
                    function(resp) {
                      console.log(resp);
                      userService.model.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
              account : [
              'userService',
              function(userService) {
                return userService.account().then(
                  function(resp) {
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false};
                  }
                );
              }
            ],
              subscriptions : [
              'resourceService',
              function(resourceService) {
                return resourceService.subscriptions().then(
                  function(resp) {
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false};
                  }
                );
              }
            ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/subscription/subscriptions.select.html',
                controller:'subscriptions.select.controller',
                controllerAs:'ssc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
		controller:'top.controller',
		controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
		controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.subscription.payment',
            url: '^/profile/subscription/payment',
            data : {
              status : 'profile'
            },
            resolve: {
              user : [
                'userService',
                function(userService) {
                  console.log('resolve.user');
                  return userService.details().then(
                    function(resp) {
                      console.log(resp);
                      userService.model.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
              account : [
              'userService',
              function(userService) {
                return userService.account().then(
                  function(resp) {
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false};
                  }
                );
              }
            ],
            subscriptions : [
            'resourceService',
            function(resourceService) {
              return resourceService.subscriptions().then(
                function(resp) {
                  return {status:true, data:resp.data};
                },
                function(resp) {
                  return {status:false};
                }
              );
            }
          ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/subscription/subscriptions.payment.html',
                controller:'subscriptions.payment.controller',
                controllerAs:'spc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
		controller:'top.controller',
		controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
		controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.subscription.success',
            url: '^/profile/subscription/success',
            data : {
              status : 'profile'
            },
            resolve: {
              user : [
                'userService',
                function(userService) {
                  console.log('profile.subscription.success.resolve.user');
                  return userService.fetch().then(
                    function(resp) {
                      console.log(resp);
                      userService.model.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/subscription/subscriptions.success.html',
                controller:'subscriptions.success.controller',
                controllerAs:'ssc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
		controller:'top.controller',
		controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
		controllerAs:'bc'
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
