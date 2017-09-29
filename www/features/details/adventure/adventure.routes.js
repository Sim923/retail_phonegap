/**
 * @fileOverview item details-level ui-routes configuration
 * @name adventure.routes.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
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
            name: 'home.adventure',
            parent:'home',
            url: '^/adventure/:id',
            params:{
              aid:null
            },
            resolve:{
              adventure : [
                '$stateParams',
                'adventureService',
                function($stateParams, adventureService) {
                  console.log('stateParams', $stateParams);
                  var id = $stateParams.id || $stateParams.aid;
                  adventureService.id.set(id);
                  return adventureService.fetch().then(
                    function(resp) {
                      console.log({status:true, data:resp.data});
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log(resp);
                      return {status:false};
                    }
                  );
                }
              ],
              user : [
                'userService',
                function(userService) {
                  console.log('resolve.user');
                  return userService.fetch().then(
                    function(resp) {
                      userService.model.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    });
                }
              ]
            },
            authenticate:false,
            views : {
              'content@':{
                templateUrl:'features/details/adventure/index.html',
                controller:'adventure.detail.controller',
                controllerAs:'adc'
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
