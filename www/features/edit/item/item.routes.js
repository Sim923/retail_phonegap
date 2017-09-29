/**
 * @fileOverview
 * @name item.routes.js<edit>
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
            name: 'home.item.edit',
            parent:'home',
            url: '^/home/item/edit/:id',
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
              options:[
		"$stateParams",
		"optionsService",
		function($stateParams, optionsService) {
                  var id = $stateParams.id;
                  return optionsService.fetchListingOptions(id).then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:{options:{highlight:{isActive:false}, viewCounter:{isActive:false}, boldface:{isActive:false}, showcase:{isActive:false}}}};
                    }
                  );
		}
              ],	      
              optionsPrices: [
                'optionsPricesService',
                function(optionsPricesService) {
                  return optionsPricesService.prices.fetch().then(
                    function(resp) {
                      optionsPricesService.prices.set(resp.data);
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
              listing : [
                '$stateParams',
                'itemService',
                function($stateParams, itemService) {
                  var id = $stateParams.id;
                  itemService.id.set(id);
                  return itemService.fetch(id).then(
                    function(resp) {
                      itemService.model.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log(resp);
                      return {status:false};
                    });
                }
              ]
            },
            authenticate:true,
            views : {
              'content@':{
                templateUrl:'features/listing/item/item.edit.html',
                controller:'item.edit.controller',
                controllerAs:'iec'
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
        for (var i=0; i< states.length; i++) {
          $stateProvider.state(states[i]);
        }
      }
    ]
  );
})(console, angular);
