/**
 * @fileOverview Controller for third step of Adventure wizard
 * @name adventure.step.3.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular, google) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'adventure.step.3.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'NgMap',
      'adventureService',
      'countries',
      'categories',
      function($log, $state, $timeout, NgMap, adventureService, countries, categories) {
        var model = adventureService.model.get();
        console.log('adventure.step3.controller.model: ', model);
        var map = null;
        var place = null;
        var location = {};

        var $this = this;
        $this.activeview = 3;
        /**
         * mapInit
         * @param {object} map
         */
        var mapInit = function(map) {

          var input = document.getElementById('location');
          google.maps.event.addDomListener(input, 'keydown', function(e) {
            if (e.keyCode == 13) {
              e.preventDefault();
            }
          });

          var lat = model.location.lat;
          var lng = model.location.lng;
          var latlng = new google.maps.LatLng(lat, lng);
          map.setCenter(latlng);
        };

        /**
         * placeChanged
         */
        var placeChanged = function() {
          place = this.getPlace();
          if (typeof(place.geometry)==='undefined') {
          } else {
            var _model = adventureService.model.get();
            _model.location.address = place.formatted_address;
            _model.location.lat = place.geometry.location.lat();
            _model.location.lng = place.geometry.location.lng();
            location=angular.copy(_model.location);
            adventureService.model.set(_model, 'internal');
          }
          map.setCenter(place.geometry.location);
        };

        NgMap.getMap().then(
          function(m) {
            console.log("NgMap.getMap");
            map = m;
          }
        );

        /**
         * back
         */
        var back = function() {
          adventureService.model.set(model, "internal"); // flag is set to prevent dividing the number by 100
          $state.go('adventure-wizard.step2');
        };

        /**
         * next
         */
        var next = function() {
          $log.log('adventure.step.3.controller.next');
          model.location=angular.copy(location);
          adventureService.model.set(model, "internal"); // flag is set to prevent dividing the number by 100
          $state.go('adventure-wizard.step4');
        };

        // Quantity controls

        /**
         * canDecrement
         * @returns {boolean} 
         */
	var canDecrement = function(property) {
	  var min = model[property] <= 1;
	  return min || model.disabled;
	};
	
        /**
         * canIncrement
         * @returns {boolean} 
         */
	var canIncrement = function(property) {
	  var max = model[property] > 365;
	  return max || model.disabled;
	};
	
        /**
         * canEnter
         * @returns {boolean} 
         */
	var canEnter = function(property) {
	  var min = model[property] <= 1;
	  var max = model[property] > 365;
	  return (min || max || model.disabled);
	};

        /**
         * increment
         */
	var increment = function(property) {
	  model[property] += 1; 
	};

        /**
         * decrement
         */
	var decrement = function(property) {
	  model[property] -= 1;
  };
  
  // make active tab rate

  var makeActive = function(value){
    $this.step = value;
  }

        /**
         * init
         */
        var init = function() {
          $log.log('adventure.step.3.controller.init');
        };
        init();

        // Exports

        angular.extend(this, {
          canDecrement:canDecrement,
          canIncrement:canIncrement,
          canEnter:canEnter,
          increment:increment,
          decrement:decrement,
          model:model,
          countries:countries.data,
          categories:categories,
          mapInit:mapInit,
          placeChanged:placeChanged,
          next:next,
          back:back,
          makeActive:makeActive
        });
      }
    ]
  );
})(console, angular, google);
