/**
 * @fileOverview adventure detail view controller
 * @name adventure.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular, google) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'adventure.detail.controller',
    [
      '$log',
      '$state',
      'NgMap',
      'adventure',
      'adventureService',
      'jkService',
      'user',
      '$timeout',
      function($log, $state, NgMap, adventure, adventureService, jkService, user, $timeout) {
	
        adventureService.model.set(adventure.data);
        var model = adventureService.model.get();
        var adventureId = adventureService.id.get();
        var selectedImage = 0;

        var map = null;
        var place = null;

        var mapInit = function(map) {
          var lat = model.location.lat;
          var lng = model.location.lng;
          var latlng = new google.maps.LatLng(lat, lng);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: model.location.address
          });
          map.setCenter(latlng);
          marker.setMap(map);
        };

        NgMap.getMap().then(
          function(m) {
            console.log("NgMap.getMap");
            map = m;
          }
        );

        /**
         * edit
         */
        var edit = function() {
          $state.go('home.adventure.edit', {id:adventureService.id.get()});
        };

        /**
         * refund
         */
        var refund = function() {
        };

        /**
         * remove
         */
        var remove = function() {
          console.log('remove');
          adventureService.remove().then(
            function(resp) {
              $timeout(function() {
                $state.go('profile.adventures');
              }, 1);
            },
            function(resp) {
              console.log(resp);
            }
          );
        };

        /**
         * init
         */
        var init = function() {
          $log.log('adventure.detail.controller.init');
        };

        init();

        var onSwipeLeft = function() {
          jkService.navigateRight();
        };

        var onSwipeRight = function() {
          jkService.navigateLeft();
        };

        var convertCurrency = function(c) {
          return c;
        };

        var isItemOwnedByUser = function() {
          var postedBy = model.postedByUserId._id;
          if (user.data) {
            if(user.data._id === postedBy) {
              return true;
            }
              console.log("non-owner.");
          }
          console.log("undefined user.data");
          return false;
          // var userId = user.data._id;
          // var postedBy = model.postedByUserId._id;
          // if(userId === postedBy) {
          //   return true;
          // }
          // return false;
        };

        angular.extend(this, {
          model:model,
          adventureId:adventureId,
          edit:edit,
          mapInit:mapInit,
          refund:refund,
          remove:remove,
          onSwipeLeft:onSwipeLeft,
          onSwipeRight:onSwipeRight,
          convertCurrency:convertCurrency,
          isItemOwnedByUser:isItemOwnedByUser
        });
      }
    ]
  );
})(console, angular, google);
