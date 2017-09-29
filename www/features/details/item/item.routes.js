/**
 * @fileOverview item details-level ui-routes configuration
 * @name item.routes.js
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
            name: 'home.item',
            parent:'home',
            url: '^/item/:id',
            params: {
              iid:null
            },
            resolve : {
              listing : [
                '$stateParams',
                'itemService',
                function($stateParams, itemService) {
		  console.log('home.item.listing.resolve');
                  var id = $stateParams.id || $stateParams.iid;
                  itemService.id.set(id);
                  return itemService.fetch(id).then(
                    function(resp) {
                      console.log('itemService.fetch', {status:true, data:resp.data});
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
              watching : [
		'$stateParams',
		'watchesService',
		function($stateParams, watchesService) {
		  var id = $stateParams.id || $stateParams.iid;
                  return watchesService.fetch.status(id).then(
                    function(resp) {
		      console.log(resp);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
		      console.log(resp);
                      return {status:false, data:{watching:false}};
                    }
                  );
		}
              ],
              watches : [
		'$stateParams',
		'watchesService',
		function($stateParams, watchesService) {
		  var id = $stateParams.id || $stateParams.iid;
                  return watchesService.fetch.count(id).then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:{}};
                    }
                  );
		}
              ]
            },
            authenticate:false,
            views : {
              'content@':{
                templateUrl:'features/details/item/item.html',
                controller:'item.detail.controller',
                controllerAs:'idc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
		controller:'top.controller',
                controllerAs: 'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
		controller:'bottom.controller',
		controllerAs:'bc'
              }
            }
          },
          {
            name: 'home.offer',
            parent:'home',
            url: '^/item/offers/:id',
            params: {
              id:""
            },
            resolve:{
              listing : [
                '$stateParams',
                'itemService',
                'offerService',
                function($stateParams, itemService, offerService) {
                  var id=$stateParams.id;
                  offerService.id.set(id);
                  return itemService.fetch(id).then(
                    function(resp) {
                      var listing = resp.data;
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log(resp);
                      return {status:false};
                    });
                }
              ],
              user : [
                'userService',
                function(userService) {
                  console.log('resolve.user');
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
            authenticate:false,
            views : {
              'content@':{
                templateUrl:'features/details/item/item.offer.html',
                controller:'item.offer.controller',
                controllerAs:'occ'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
		controller:'top.controller',
		controllerAs:'tc',
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
		controllerAs:'bc'
              }
            }
          }
        ];
        for (var i=0; i< states.length; i++) {
          $stateProvider.state(states[i]);
        }
      }
	]
  );
})(console, angular);
