/**
 * @fileOverview login view controller
 * @name signup.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
    'use strict';
    var RTMobileApp = angular.module('RTMobileApp');
    RTMobileApp.controller(
      'signup.controller',
      [
        '$log',
        '$state',
        function($log, $state) {
  
          /**
           * init
           */
          var init = function() {
            $log.log('signup.controller.init');
          };
      
          init();
  
          angular.extend(this, {
        error:error
          });
        }
      ]
    );
  })(console, angular);
  