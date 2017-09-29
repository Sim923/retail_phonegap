/**
 * @fileOverview AngularJS Application Service the device connecting to the Reeltrail application
 * @name device.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'deviceService',
    [
      '$log',
      '$http',
      '$window',
      'messageService',
      'rtsocket',
      function($log, $http, $window, messageService, rtsocket) {
        var deviceService = {};
        deviceService.data = {};
        deviceService.data._data = {};
        deviceService.data._data.socketId = "";

        /**
         * hasRegistered
         * @returns {boolean} 
         */
        deviceService.hasRegistered = function() {
          var result = true;
          if (typeof($window.localStorage.registered)==='undefined') {
            result=false;
          }
          return result;
        };

        /**
         * setRegistered
         */
        deviceService.setRegistered = function() {
          $window.localStorage.registered=true;
        };

        /**
         * init
         */
        deviceService.init = function() {
          $log.log('deviceService.init');
          rtsocket.responders.device = {
            connected:function(data) {
              var id = data.id;
              deviceService.data._data.socketId = id;
              if (typeof($window.localStorage.token)==='undefined') {
                console.log('no token');
              } else {
                var message={command:'verify'};
                rtsocket.sender(message);
              }
            },
            update:function(data) {
              if ('token' in data) {
                $window.localStorage.token = data.token;
              }
              console.dir(data);
            }
          };          
        };
        deviceService.init();

        return deviceService;
      }
    ]
  );
})(console, angular);
