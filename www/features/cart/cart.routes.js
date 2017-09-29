/**
 * @fileOverview Primary-level ui-routes configuration
 * @name app.routes.js
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
            name: 'home.cart',
            url: '^/cart',
            secured:true,
            confirmed:false,
            checklist:false,
            resolve:{
              cart : [
                '$stateParams',
                'cartService',
                function($stateParams, cartService) {
                  return cartService.fetch().then(
                    function(resp) {
                      console.log('cart.resolve', resp.data);
                      cartService.items.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log(resp);
                      return {status:false};
                    }
		  );
                }
              ]
            },
            parent:'home',
            authenticate:true,
            views:{
              'content@':{
                templateUrl:'features/cart/cart.html',
                controller:'cart.controller',
                controllerAs:'cc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
		controller:'top.controller',
                controllerAs: 'tc'
              },
    //           'bottomNav@':{
    //             templateUrl:'common/navigation/bottom/bottom.html',
    //             controller:'bottom.controller',
		// controllerAs:'bc'
    //           }
            }
          },
          {
            name: 'home.cart.shipping',
            url: '^/cart/shipping/:sellerId',
            secured:true,
            confirmed:false,
            checklist:false,
            resolve:{
              addresses:[
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
              cart:[
                '$stateParams',
                'cartService',
                function($stateParams, cartService) {
                  var id = $stateParams.sellerId;
                  console.log('resolve routes id cart shipping: ', id);
                  return cartService.seller(id).then(
                    function(resp) {
		      cartService.items.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:resp.data};
                    }
                  );
                }
              ]
            },
            parent:'home',
            authenticate:true,
            views:{
              'content@':{
                templateUrl:'features/cart/cart.shipping.html',
                controller:'cart.shipping.controller',
                controllerAs:'csc'
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
          }, {
            name: 'home.cart.payment',
            url: '^/cart/payment/:sellerId',
            secured:true,
            confirmed:false,
            checklist:false,
            resolve:{
              addresses:[
		'addressesService',
		function(addressesService) {
		  return addressesService.address.list().then(
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
              cart:[
                '$stateParams',
                'cartService',
                function($stateParams, cartService) {
                  var id = $stateParams.sellerId;
                  console.log('resolve routes id cart payment: ', id);
                  return cartService.seller(id).then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:resp.data};
                    }
                  );
                }
              ],
              taxes:[
                'userService',
		'cartService',
		'cartShippingService',
		'taxesService',
		function(userService, cartService, cartShippingService, taxesService) {
                  var apiKey=userService.model.get().settings.taxify ? userService.model.get().settings.taxify.apiKey : "";
		  var oa = cartShippingService.model.get(); 
		  var destination={
		    Street1:oa.line1,
		    City:oa.city,
		    Region:oa.state,
		    PostalCode:oa.zipCode,
		    Country:oa.country,
		    Email:oa.email,
		    Phone:oa.phone
		  };
		  var items=cartService.taxable(oa.state);
		  return taxesService.calculate(items, destination).then(
		    function(resp) {
                      taxesService.items.set(resp.data);
                      return {status:true, data:resp.data};
		    },
		    function(resp) {
                      return {status:false, data:{items:[], total:0}};
		    }
		  );
		}
              ]	      
            },
            parent:'home',
            authenticate:true,
            views:{
              'content@':{
                templateUrl:'features/cart/cart.payment.html',
                controller:'cart.payment.controller',
                controllerAs:'cpc'
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
          }, {
            name: 'home.cart.success',
            url: '^/cart/success/:sellerId',
            secured:true,
            confirmed:false,
            checklist:false,
            resolve:{
              cart : [
                '$stateParams',
                'cartService',
                function($stateParams, cartService) {
                  return cartService.fetch().then(
                    function(resp) {
                      console.log('cart.resolve', resp.data);
                      cartService.items.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log(resp);
                      return {status:false};
                    }
		  );
                }
              ]
            },
            parent:'home',
            authenticate:true,
            views:{
              'content@':{
                templateUrl:'features/cart/cart.success.html',
                controller:'cart.success.controller',
                controllerAs:'csc'
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
          }
        ];
        for (var i=0; i< states.length; i++) {
          $stateProvider.state(states[i]);
        }
      }
    ]
  );
})(console, angular);
