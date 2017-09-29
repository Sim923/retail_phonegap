/**
 * @fileOverview Item ui-routes configuration
 * @name adventure.routes.js
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
	    name: 'adventure-wizard',
	    url: '^/adventure-wizard',
	    authenticate:true,
	    params:{
	      reset:null
	    },
	    resolve : {
	      adventure: [
					'$stateParams',
					'adventureService',
					function($stateParams, adventureService) {
						if ($stateParams.reset) {
							adventureService.model.reset();
						}
					}
	      ],
	      categories: [
		'categoryService',
		function(categoryService) {
		  return categoryService.categories.fetch().then(
		    function(resp) {
		      console.log('adventure.routes.resolve', resp.data);
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
		templateUrl:'features/listing/adventure/adventure.wizard.step.1.html',
		controller:'adventure.step.1.controller',
		controllerAs:'as1c'
	      },
	      'topNav@':{
					templateUrl:'common/navigation/top/top.html',
					controller:'top.controller',
					controllerAs:'tc'
				}
	    }
	  }, {
	    name: 'adventure-wizard.step2',
	    url: '^/adventure-wizard/step2',
	    authenticate:true,
	    onEnter: function() {
	      angular.element(document.querySelector('#ContentPane')).scrollTop = 0;
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
		templateUrl:'features/listing/adventure/adventure.wizard.step.2.html',
		controller:'adventure.step.2.controller',
		controllerAs:'as2c'
	      },
	      'topNav@':{
					templateUrl:'common/navigation/top/top.html',
					controller:'top.controller',
					controllerAs:'tc'
				}
	    }
	  }, {
	    name: 'adventure-wizard.step3',
	    url: '^/adventure-wizard/step3',
	    authenticate:true,
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
		templateUrl:'features/listing/adventure/adventure.wizard.step.3.html',
		controller:'adventure.step.3.controller',
		controllerAs:'as3c'
	      },
	      'topNav@':{
					templateUrl:'common/navigation/top/top.html',
					controller:'top.controller',
					controllerAs:'tc'
				}
	    }
	  }, {
	    name: 'adventure-wizard.step4',
	    url: '^/adventure-wizard/step4',
	    authenticate:true,
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
              adventuresOptionsPrices: [
		'adventuresOptionsPricesService',
		function(adventuresOptionsPricesService) {
		  return adventuresOptionsPricesService.prices.fetch().then(
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
		templateUrl:'features/listing/adventure/adventure.wizard.step.4.html',
		controller:'adventure.step.4.controller',
		controllerAs:'as4c'
	      },
	      'topNav@':{
					templateUrl:'common/navigation/top/top.html',
					controller:'top.controller',
					controllerAs:'tc'
				}
	    }
	  }, {
	    name: 'adventure-wizard.options',
	    url: '^/adventure-wizard/options',
	    authenticate:true,
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
	      options : [
		'$stateParams',
		'adventureService',
		function($stateParams, adventureService) {
                  var id = adventureService.id.get();
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
		  return adventuresOptionsPricesService.prices.fetch().then(
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
	    parent:'',
	    views:{
	      'content@':{
		templateUrl:'features/listing/adventure/adventure.payment.html',
		controller:'adventure.payment.controller',
		controllerAs:'aopc'
	      },
	      'topNav@':{
		templateUrl:'common/navigation/top/top.adventure.html',
		controller:'top.controller'
	      }
	    }
	  }, {
	    name: 'adventure-wizard.success',
	    url: '^/adventure-wizard/success',
	    authenticate:true,
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
		templateUrl:'features/listing/adventure/adventure.success.html',
		controller:'adventure.success.controller',
		controllerAs:'asc'
	      },
	      'topNav@':{
		templateUrl:'common/navigation/top/top.adventure.html',
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
