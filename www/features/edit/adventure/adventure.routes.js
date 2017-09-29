/**
 * @fileOverview
 * @name adventure.routes.js<edit>
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
            name: 'home.adventure.edit',
            parent:'home',
            url: '^/home/adventure/edit/:id',
            resolve:{
              categories: [
                'categoryService',
                function(categoryService) {
                  return categoryService.categories.fetch().then(
                    function(resp) {
                      categoryService.categories.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
              countries: [
                'countryService',
                function(countryService) {
                  return countryService.countries.fetch().then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
	      adventureOptions : [
		'$stateParams',
		'adventureService',
		function($stateParams, adventureService) {
                  var id = $stateParams.id;
                  return adventureService.fetchAdventureOptions(id).then(
                    function(resp) {
                      console.log(resp);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:{paymentGateways:{braintree:{}}, options:{highlight:{isActive:false}, viewCounter:{isActive:false}, boldface:{isActive:false}, showcase:{isActive:false}}}};
                    }
                  );
		}
	      ],
              adventuresOptionsPrices: [
                'adventuresOptionsPricesService',
                function(adventuresOptionsPricesService) {
                  console.log('adventuresOptionsPrices.resolve');
                  return adventuresOptionsPricesService.prices.fetch().then(
                    function(resp) {
                      adventuresOptionsPricesService.prices.set(resp.data);
                      var data = {};
                      data.showcase = (resp.data.showcase.price / 100).toFixed(2);
                      data.viewCounter = (resp.data.viewCounter.price / 100).toFixed(2);
                      data.boldface = (resp.data.boldface.price / 100).toFixed(2);
                      data.highlight = (resp.data.highlight.price / 100).toFixed(2);
                      return {status:true, data:data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
              adventure : [
                '$stateParams',
                'adventureService',
                function($stateParams, adventureService) {
                  var id = $stateParams.id;
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
              ]
            },
            authenticate:true,
            views : {
              'content@':{
                templateUrl:'features/listing/adventure/adventure.edit.html',
                controller:'adventure.edit.controller',
                controllerAs:'aec'
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
