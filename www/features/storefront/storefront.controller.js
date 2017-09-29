/**
 * @fileOverview login view controller
 * @name storefront.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
    'use strict';
    var RTMobileApp = angular.module('RTMobileApp');
    RTMobileApp.controller(
      'storefront.controller',
      [
        '$log',
        '$state',
        function($log, $state) {
           var tabs = {};
            tabs._tabs = [
              {
                title:'Sort',
                url:'features/storefront/storefront.sort.html'
              },
              {
                title:'Category',
                url:'features/storefront/storefront.category.html'
              }
            ];

            tabs.get = function() {
              return tabs._tabs;
            };

            var _activeTab = 0;   

             /**
             * select
             * @param {number} num
             */
            tabs.select = function(num) {
              tabs.selected = num;
            };
  
          /**
           * init
           */
          var init = function() {
            $log.log('storefront.controller.init');
          };
      
          init();
  
          angular.extend(this, {
        error:error
          });
        }
      ]
    );
  }