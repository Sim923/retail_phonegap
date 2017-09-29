/**
 * @fileOverview
 * @name profile.watchlist.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'profileWatchlistService',
    [
      '$log',
      '$http',
      '$state',
      'baseurlService',
      function($log, $http, $state, baseurlService) {
        var profileWatchlistService = {};

        var baseUrl = baseurlService.address;

        /**
         * unwatch
         * @param {string} id
         * @returns {callback} 
         */
        profileWatchlistService.unwatch = function(id) {
          var config= {
            method:'DELETE',
            url:baseUrl+'/rtapi/v1/watches',
            data:{
              watchId:id
            }
          };
          return $http(config);
        };

        /**
         * view
         * @param {string} id
         * @returns {callback} 
         */
        profileWatchlistService.view = function(id) {
          return $state.go('home.item', {id:model._id});
        };

        /**
         * init
         */
        profileWatchlistService.init = function() {
          $log.log('profile.watchlist.service.init');
        };
        profileWatchlistService.init();

        return profileWatchlistService;
      }
    ]
  );
})(console, angular);