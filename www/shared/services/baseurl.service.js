/**
 * @fileOverview Main AngularJS Application Services for Reeltrail application
 * @name app.services.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function () {
    'use strict';
    var RTMobileApp = angular.module('RTMobileApp');
    RTMobileApp.service(
      'baseurlService',
      [
        '$log',
        '$http',
        function($log, $http) {
          var baseurlService = {};
          //baseurlService.address = "https://reeltrail.com";
          baseurlService.address="https://dev.reeltrail.com";
       
          /**
           * init
           */
          baseurlService.init = function() {
            console.log('addressService.init');
          };
  
          baseurlService.init();
  
          return baseurlService;
  
        }
      ]
    );
  })();
  
