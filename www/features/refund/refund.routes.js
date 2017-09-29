/**
 * @fileOverview register service
 * @name profile.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      var states = [
        {
          name: 'profile.refund',
          url: '^/refund/:id',
          ssecured:true,
          confirmed:false,
          checklist:false,
          params: {
            id: ''
          },
          data : {
            status : 'refund'
          },
          resolve : {
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
            sale : [
	      '$stateParams',
	      'salesService',
	      function($stateParams, salesService) {
		console.log('sale: ', $stateParams);
		var id = $stateParams.id;
		return salesService.get(id).then(
                  function(resp) {
                    console.log('sales: ', resp.data);
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:true, data:resp.data};
                  }
		);
	      }
            ],
            refund : [
	      '$stateParams',
	      'refundsService',
	      function($stateParams, refundsService) {
		var id = $stateParams.id;
		console.log('refund: ', id);
		return refundsService.fetchRefundById(id).then(
                  function( resp ) {
                    console.log( resp.data );
                    return {status:true, data:resp.data, request:false};
                  },
                  function(resp) {
                    if (resp.status===404) {
		      return {status:false, data:{}, request:true};
                    } else {
		      return {status:false, data:{}, request:false};
                    }
                  }
		);
	      }
            ]
          },
          parent:'',
          views:{
            'content@':{
              templateUrl:'features/refund/refund.html',
              controller:'refunds.controller',
              controllerAs:'rc'
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
      ]);
})(console, angular);
