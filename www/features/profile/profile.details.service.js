/**
 * @fileOverview
 * @name profile.details.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'profileDetailsService',
    [
      '$log',
      '$http',
      'userService',
      'baseurlService',
      function($log, $http, userService, baseurlService) {
        var profileDetailsService = {};
        var baseUrl = baseurlService.address;
        var userId = userService.model.get()._id;
        profileDetailsService.model = {};
        profileDetailsService.model._model = {};
        profileDetailsService.images = {};
        profileDetailsService.images._images = [];

        profileDetailsService.images.set = function(images) {
          profileDetailsService.images._images = images;
        };

        profileDetailsService.images.get = function(images) {
          return profileDetailsService.images._images;
        };

        profileDetailsService.images.update = function(image) {
          profileDetailsService.images._images.push({
            url: image.url
          });
        };

        profileDetailsService.images.change = function(image) {
          console.log(image);
          console.log(profileDetailsService.images._images);
          var images = profileDetailsService.images._images;
          for(var i=0;i<images.length;i++) {
            if(image.identifier === images[i]._id) {
              profileDetailsService.images._images[i] = image;
              console.log(profileDetailsService.images._images);
            }
          }
        };

        profileDetailsService.images.delete = function(image) {
          console.log(profileDetailsService.images._images);
          var images = profileDetailsService.images._images;
          for(var i=0;i<images.length;i++) {
            if(image._id === images[i]._id) {
              profileDetailsService.images._images.splice(i, 1);
              console.log(profileDetailsService.images._images);
            }
          }
        };

        profileDetailsService.model.set = function(model) {
          profileDetailsService.model._model = model;
        };

        profileDetailsService.model.get = function() {
          return profileDetailsService.model._model;
        };

        profileDetailsService.model.update = function(model) {
          console.log(model);
          for(var key in model) {
            if(key === "images") {
              profileDetailsService.model._model[key] = profileDetailsService.images._images;
            } else {
              profileDetailsService.model._model[key] = model[key];
            }
          }
          profileDetailsService.model._model = model;
        };

        profileDetailsService.model.profileImageUpload = function(profileImageUrl) {
          return $http({
            method: "POST",
            data: {
              userId: userId,
              profileImageUrl: profileImageUrl
            },
            url: baseUrl+"/rtapi/v1/users/image/update"
          });
        };

        var removeBase64 = function(model) {
          for(var i=0;i<model.images.length;i++) {
            delete model.images[i].base64data;
          }
          return model;
        };

        /**
         * update
         * @param {object} model
         * @returns {callback}
         */
        profileDetailsService.update = function(model) {
          model = removeBase64(model);
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/users/details",
            data: {
              model: model
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * cloud_upload
         * @param {object} base64data
         * @param {object} identifier
         * @returns {callback}
         */
        profileDetailsService.images.cloud_upload = function(base64data, identifier) {
          return $http({
            method: "POST",
            data: {
              base64data: base64data,
              identifier: identifier
            },
            url: baseUrl+"/rtimages/cloud_upload"
          });
        };

        return profileDetailsService;
      }
    ]
  );
})(console, angular);
