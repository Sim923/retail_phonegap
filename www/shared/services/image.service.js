/**
 * @fileOverview AngularJS Application Service the device connecting to the Reeltrail application
 * @name image.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular, _) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'imageService',
    [
      '$log',
      '$http',
      '$window',
      'rtsocket',
      function($log, $http, $window, rtsocket) {
        var imageService = {};
        imageService.images = {};
        imageService.images._images = [];

        /**
         * images.remove
         * @param {object} $file
         */
        imageService.images.remove = function($file) {
          console.log('imageService.images.remove');
          var id = $file.id;
          delete imageService.images._images[id];
        };

        /**
         * images.reset
         */
        imageService.images.reset = function() {
          for (var key in imageService.images._images) {
            delete imageService.images._images[key];
          }
          console.log(imageService.images._images);
        };

        /**
         * images.add
         * @param {object} $file
         */
        imageService.images.add = function($file) {
          var id = $file.uniqueIdentifier;
          var name = $file.name;
          var progress = Math.floor(_.isFunction($file.progress) ? $file.progress()*100 : $file.progress);
          var pos = Object.keys(imageService.images._images).length;
          var base64data=$file.base64data;
          var url=$file.url;
          imageService.images._images[id] = {id:id, name:name, progress:progress, pos:pos, base64data:base64data, url:url};
          console.log(imageService.images._images);
        };

        /**
         * images.update
         * @param {object} $file
         * @param {object} $message
         */
        imageService.images.update = function($file, $message) {
          imageService.images._images[$file.uniqueIdentifier].progress = Math.floor($file.progress()*100);
          if ($message) {
            imageService.images._images[$file.uniqueIdentifier] = 
              angular.merge(imageService.images._images[$file.uniqueIdentifier], $message);
          }
        };

        /**
         * images.reorder
         * @param {array} arr
         */
        imageService.images.reorder = function(arr) {
          for (var i=0; i<arr.length; i++) {
            if (arr[i].id in imageService.images._images) {
              imageService.images._images[arr[i].id].pos = arr[i].pos;
            }
          }
          console.dir(imageService.images._images);
        };

        /**
         * setCropped
         * @param {object} $file
         * @param {object} oldId
         * @returns {object} 
         */
        imageService.images.setCropped = function($file, oldId) {
          console.log(oldId);
          for (var id in imageService.images._images) {
            console.log(id);
            if(id === oldId) {
              for(var key in imageService.images._images[id]) {
                imageService.images._images[id][key] = $file[key];
              }
            }
          }
          console.log(imageService.images._images);
        };

        /**
         * images.get
         * @param {object} $file
         * @returns {object} 
         */
        imageService.images.get = function($file) {
          return imageService.images._images[$file.uniqueIdentifier];
        };

        /**
         * images.list
         * @returns {array} 
         */
        imageService.images.list = function() {
          return imageService.images._images;
        };

        var getFileExtension = function(file) {
          var result = file.split(".");
          var extension = result[result.length-1];
          return extension;
        }; 

        imageService.images.encode = function(url, callback, outputFormat) {
          var img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null;
          };
          img.src = url;
        };

        /**
         * init
         */
        imageService.init = function() {
          $log.log('imageService.init');
        };
        imageService.init();

        return imageService;
      }
    ]
  );
})(console, angular, _);
