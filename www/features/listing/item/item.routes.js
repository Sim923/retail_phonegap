/**
 * @fileOverview Item ui-routes configuration
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
	    name: 'item-wizard',
	    url: '^/item-wizard',
	    authenticate:true,
	    params:{
	      reset:null
	    },
	    data: {
              status: 'item-listing'
	    },
	    resolve : {
	      item: [
		'$stateParams',
		'itemService',
		function($stateParams, itemService) {
		  if ($stateParams.reset) {
		    itemService.model.reset();
		  }
		}
	      ],
              user:[
		'userService',
		function(userService) {
		  return userService.fetch().then(
		    function(resp) {
                      console.log('listing.edit.resolve.user', resp);
                      userService.model.set(resp.data);
                      return {status:true, data:resp.data};
		    },
		    function(resp) {
                      return {status:true};
		    }
		  );
		}
              ],
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
	      ]
	    },
	    parent:'',
	    views:{
	      'content@':{
		templateUrl:'features/listing/item/item.wizard.step.1.html',
		controller:'item.step.1.controller',
		controllerAs:'is1c'
	      },
	      'topNav@':{
					templateUrl:'common/navigation/top/top.html',
					controller:'top.controller',
					controllerAs:'tc'
				}
	    }
	  },
	  {
	    name: 'item-wizard.step2',
	    url: '^/item-wizard/step2',
	    authenticate:true,
	    onEnter: function() {
	      angular.element(document.querySelector('#ContentPane')).scrollTop = 0;
	    },
	    data: {
              status: 'item-listing'
	    },
	    resolve : {
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
	      ]
	    },
	    parent:'',
	    views:{
	      'content@':{
		templateUrl:'features/listing/item/item.wizard.step.2.html',
		controller:'item.step.2.controller',
		controllerAs:'is2c'
	      },
	      'topNav@':{
					templateUrl:'common/navigation/top/top.html',
					controller:'top.controller',
					controllerAs:'tc'
				}
	    }
	  },
	  {
	    name: 'item-wizard.step3',
	    url: '^/item-wizard/step3',
	    authenticate:true,
	    data: {
              status: 'item-listing'
	    },
	    resolve : {
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
	      ]
	    },
	    parent:'',
	    views:{
	      'content@':{
		templateUrl:'features/listing/item/item.wizard.step.3.html',
		controller:'item.step.3.controller',
		controllerAs:'is3c'
	      },
	      'topNav@':{
					templateUrl:'common/navigation/top/top.html',
					controller:'top.controller',
					controllerAs:'tc'
				}
	    }
	  },
	  {
	    name: 'item-wizard.step4',
	    url: '^/item-wizard/step4',
	    authenticate:true,
	    data: {
              status: 'item-listing'
	    },
	    resolve : {
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
	      ]
	    },
	    parent:'',
	    views:{
	      'content@':{
		templateUrl:'features/listing/item/item.wizard.step.4.html',
		controller:'item.step.4.controller',
		controllerAs:'is4c'
	      },
				'topNav@':{
					templateUrl:'common/navigation/top/top.html',
					controller:'top.controller',
					controllerAs:'tc'
				}
	    }
	  },
	  {
	    name: 'item-wizard.step5',
	    url: '^/item-wizard/step5',
	    authenticate:true,
	    data: {
              status: 'item-listing'
	    },
	    resolve : {
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
	      optionsPrices: [
		'optionsPricesService',
		function(optionsPricesService) {
		  return optionsPricesService.prices.fetch().then(
		    function(resp) {
		      console.log(resp.data);
		      return {status:true, data:resp.data};
		    },
		    function(resp) {
		      return {status:false, data:{showcase:{price:0}, boldface:{price:0}, viewCounter:{price:0}, highlight:{price:0}}};
		    }
		  );
		}
	      ]
	    },
	    parent:'',
	    views:{
	      'content@':{
		templateUrl:'features/listing/item/item.wizard.step.5.html',
		controller:'item.step.5.controller',
		controllerAs:'is5c'
	      },
	      'topNav@':{
					templateUrl:'common/navigation/top/top.html',
					controller:'top.controller',
					controllerAs:'tc'
				}
	    }
	  },
	  {
	    name: 'item-wizard.options',
	    url: '^/item-wizard/options',
	    authenticate:true,
	    data: {
              status: 'item-listing'
	    },
	    resolve : {
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
              options:[
		"$stateParams",
		"itemService",
		"optionsService",
		function($stateParams, itemService, optionsService) {
                  var id = itemService.id.get();
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
		      console.log(resp.data);
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
		templateUrl:'features/listing/item/item.options.payment.html',
		controller:'item.options.payment.controller',
		controllerAs:'iopc'
	      },
	      'topNav@':{
		templateUrl:'common/navigation/top/top.item.html',
		controller:'top.controller'
	      }
	    }
	  },
	  {
	    name: 'item-wizard.success',
	    url: '^/item-wizard/success',
	    authenticate:true,
	    data: {
              status: 'item-listing'
	    },
	    resolve : {
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
	      ]
	    },
	    parent:'',
	    views:{
	      'content@':{
		templateUrl:'features/listing/item/item.success.html',
		controller:'item.success.controller',
		controllerAs:'isc'
	      },
	      'topNav@':{
		templateUrl:'common/navigation/top/top.item.html',
		controller:'top.controller'
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
