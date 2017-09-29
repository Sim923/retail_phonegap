/**
 * @fileOverview
 * @name profile.items.service.js
 * @author 
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'profileItemsService',
    [
      '$log',
      '$http',
      function($log, $http) {
        var profileItemsService = {};
        profileItemsService.rows=12;
        profileItemsService.start=0;
        profileItemsService.list={};
        profileItemsService.list.fetch={};
        profileItemsService.list.fetch.user={};

        profileItemsService.list.fetch.user.all = function() {
          return $http({
            method: "POST",
            url: "https://reeltrail.com/rtapi/v1/listings/search/user/all",
            data:{
              start:profileItemsService.start,
              rows:profileItemsService.rows,
              type:'Listing'
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        profileItemsService.init = function() {
          $log.log('profile.items.service.init');
        };
        profileItemsService.init();
        return profileItemsService;
      }
    ]
  );
})(console, angular);