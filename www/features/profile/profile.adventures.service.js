/**
 * @fileOverview
 * @name profile.adventures.service.js
 * @author 
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'profileAdventuresService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http, baseurlService) {
        var profileAdventuresService = {};
        profileAdventuresService.rows=12;
        profileAdventuresService.start=0;
        profileAdventuresService.list={};
        profileAdventuresService.list.fetch={};
        profileAdventuresService.list.fetch.user={};

        var baseUrl = baseurlService.address;

        profileAdventuresService.list.fetch.user.all = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listings/search/user/all",
            data:{
              start:profileAdventuresService.start,
              rows:profileAdventuresService.rows,
              type:'Listing'
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };
        
        profileAdventuresService.init = function() {
        };
        profileAdventuresService.init();
        return profileAdventuresService;
      }
    ]
  );
})(console, angular);