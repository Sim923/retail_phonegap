/**
 * @fileOverview profile service
 * @name profile.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'profileService',
    [
      '$log',
      '$http',
      '$q',
      function($log, $http, $q) {
        var profileService = {};

        profileService.model = {};

        var fields = [
          {name:'firstName', value:''},
          {name:'lastName', value:''},
          {name:'profileImage', value:''},
          {name:'subscription', value:{name:''}}
        ];

        profileService.cropper = {};
        profileService.cropper._isVisible = false;
        profileService.cropper.isVisible = function() {
          return profileService.cropper._isVisible;
        };
        profileService.cropper.hide = function() {
          profileService.cropper.isVisible=false;
        };
        profileService.cropper.display = function() {
          profileService.cropper.isVisible=true;
        };

        /**
         * reset
         */
        profileService.model.reset = function() {
          profileService.model._model = {};
          profileService.model._model.options = {};
        };

        profileService.model.reset();

        /**
         * model.set
         * @param {object} model
         */
        profileService.model.set = function(model) {
          var oModel = angular.copy(model);
          console.log('profileService.model.set');
          for (var i=0; i < fields.length; i++) {
            var name = fields[i].name; console.log(name);
            if (name in oModel) {
              if (fields[i].select===true && oModel[name].value) {
                profileService.model._model[name] = oModel[name].value;
              } else {
                profileService.model._model[name] = angular.copy(oModel[name]);
              }
            }
          }
          console.log(profileService.model._model);
        };
	
        /**
         * model.get
         * @returns {object} 
         */
        profileService.model.get = function() {
          console.log(profileService.model._model);
          return angular.copy(profileService.model._model);
        };

        var _refreshCallback = null;

	profileService.data = {};
	profileService.data._data = {};

	profileService.data.set = function(property, value) {
	  profileService.data._data[property] = value;
	};

	profileService.data.get = function(property) {
	  return profileService.data._data[property];
	};
	
	profileService.setRefreshCallback = function(cb) {
          _refreshCallback = cb;	  
	};

        /**
         * refresh
         * @param {string} property
         * @param {object} value
         */
        profileService.refresh = function(property, value) {
          console.log(property, value);
          if (_refreshCallback) {
    	    profileService.data.set(property, value);
            _refreshCallback(property, value);
          } else {
            console.log('_refreshCallback not set');
          }
        };
	
        return profileService;
      }
	  ]
  );
})(console, angular);
