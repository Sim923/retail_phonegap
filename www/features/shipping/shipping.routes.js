/**
 * @fileOverview register service
 * @name profile.service.js
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
            name: 'profile.shipping.submit',
            url: '^/shipping/:id',
            secured:true,
            confirmed:true,
            checklist:false,
            params: {
              id: ''
            },
            data : {
              status : 'shipping'
            },
            resolve : {
              sale : [
                '$stateParams',
                'salesService',
                function($stateParams, salesService) {
                  var id = $stateParams.id;
                  return salesService.get(id).then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:true, data:resp.data};
                    }
                  );
                }
              ],
              addresses : [
                'addressService',
                function(addressService) {
                  console.log('shipping.submit.controller.resolve');
                  return addressService.address.list().then(
                    function(resp) {
                      console.log('resp', resp);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log('resp', resp);
                      return {status:false};
                    }
                  );
                }
              ],
              parcelTemplates : [
                'shippingService',
                function(shippingService) {
                  return shippingService.parcels().then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:[]};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/shipping/shipping.edit.html',
                controller:'shipping.submit.controller',
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
            name: 'profile.shipping.summary',
            url: '^/shipping/summary/:salesId',
            secured:true,
            confirmed:true,
            checklist:false,
            data : {
              status : 'shipping'
            },
            resolve : {
              sale : [
                '$stateParams',
                'salesService',
                function($stateParams, salesService) {
                  var id = $stateParams.salesId;
                  console.log(id);
                  return salesService.get(id).then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:true, data:resp.data};
                    }
                  );
                }
              ],
              addresses : [
                'addressService',
                function(addressService) {
                  console.log('profile.adventures.controller.resolve');
                  return addressService.address.list().then(
                    function(resp) {
                      console.log('resp', resp);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log('resp', resp);
                      return {status:false};
                    }
                  );
                }
              ],
              labels : [
                'shippingService',
                function(shippingService) {
                  var labels = shippingService.labels.get();
                  console.log('labels', labels);
                  return { status:true, data:labels };
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/shipping/shipping.summary.html',
                controller:'shipping.summary.controller',
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
