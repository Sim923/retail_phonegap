/**
 * @fileOverview Main AngularJS Application for Reeltrail application
 * @name app.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var resources = [
    'ngMessages',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'mgcrea.ngStrap',
    'angularMoment',
    'bd.sockjs',
    'flow',
    'as.sortable',
    'angular-darkroom',
    'ngMap',
    'infinite-scroll',
    'ngMaterial',
    'jkAngularCarousel',
    'ngPinchZoom',
    'ui.scroll.jqlite',
    'zendeskWidget'
  ];

  if (typeof(APP_CORDOVA)==="undefined") {
    console.log("built for desktop");
  } else {
    resources.push('ngCordova');
  }

    if (typeof(APP_OPTIMIZED)==="undefined") {
	console.log("not optimized");
    } else {
        resources.push('reeltrail.templates');
    }
    
    console.log(resources);
    
  var RTMobileApp = angular.module(
    'RTMobileApp',
    resources
  ).filter(
    "isEmpty",
    function() {
      var bar;
      return function(obj) {
        for (bar in obj) {
          if (obj.hasOwnProperty(bar)) {
            return false;
          }
        }
        return true;
      };
    }
  ).filter(
    "filterByIsActive",
    function() {
      return function(list, isActive) {
	if (list) {
          return list.filter(
            function(item) {
	      return item.isActive;
            }
          );
	}
      };
    }
  ).filter(
    'orderObjectBy',
    function() {
      return function(items, field, reverse) {
	var filtered = [];
	angular.forEach(items, function(item) {
	  filtered.push(item);
	});
	filtered.sort(function (a, b) {
	  return (a[field] > b[field] ? 1 : -1);
	});
	if(reverse) filtered.reverse();
	return filtered;
      };
    }
  ).config(
    [
      '$logProvider',
      '$locationProvider',
      '$urlRouterProvider',
      '$qProvider',
      '$dropdownProvider',
      'flowFactoryProvider',
      '$httpProvider',
      'ZendeskWidgetProvider',
      function($logProvider, $locationProvider, $urlRouterProvider, $qProvider, $dropdownProvider, flowFactoryProvider, $httpProvider, zendeskWidgetProvider) {
	$logProvider.debugEnabled(true);
	$httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
	$qProvider.errorOnUnhandledRejections(false);
	flowFactoryProvider.defaults = {
 	  target: 'https://reeltrail.com/rtimages/upload',
	  permanentErrors: [404, 500, 501],
	  maxChunkRetries: 1,
	  chunkRetryInterval: 5000,
	  simultaneousUploads: 4,
	  singleFile: true,
	  testChunks:false
	};
	flowFactoryProvider.on('catchAll', function (event) {
	  console.log(arguments);
	});
        zendeskWidgetProvider.init({
          accountUrl: 'reeltrail.zendesk.com',
          beforePageLoad: function(zE) {
            zE.hide();
          }
        });
	angular.extend($dropdownProvider.defaults, {
	  html:true
	});
	//        $locationProvider.html5Mode({enabled:true, requireBase:false});
      }
    ]
  ).run(
    [
      "$log",
      '$rootScope',
      '$state',
      'rtsocket',
      'authFactory',
      'deviceService',
      'userService',
      'categoryService',
      'paymentGatewayService',
      function ($log, $rootScope, $state, rtsocket, authFactory, deviceService, userService, categoryService, paymentGatewayService) {
	$log.log('app is up and running');
	paymentGatewayService.init();
	$rootScope.$on('$stateChangeSuccess', function() {
	  document.body.scrollTop = document.documentElement.scrollTop = 0;
	});
	rtsocket.init();
	rtsocket.setHandler(
	  'open',
	  function(e) {
	    console.log('open');
	    console.dir(e);
	    var oMessage = {command:'connect', message:'test'};
	    rtsocket.sender(oMessage);
	  }
	);
	rtsocket.setHandler(
	  'message',
	  function(e) {
	    var message = JSON.parse(e.data);
	    $log.log(message);
	    var channel=message.channel;
	    var command=message.command;
	    var data=message.data;
	    console.log(channel, command, data);
	    console.log(rtsocket.responders);
	    rtsocket.responders[channel][command](data);
	  }
	);
	rtsocket.setHandler(
	  'close',
	  function(e) {
	    console.log('socket closed');
	    console.dir(e);
	  }
	);
	$rootScope.$state = $state;
      }
    ]
  );
})(console, angular);
