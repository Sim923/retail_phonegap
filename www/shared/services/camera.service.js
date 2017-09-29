/**
 * @fileOverview AngularJS Application Service the device connecting to the Reeltrail application
 * @name camera.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'cameraService',
    [
      '$log',
      '$window',
      '$document',
      '$q',
      '$cordovaCamera',
      function CordovaCamera($log, $window, $document, $q, $cordovaCamera) {
	
	var cameraService = {};
	cameraService.options = {
	  quality: 50,
	  destinationType: Camera.DestinationType.DATA_URL,
	  sourceType: Camera.PictureSourceType.CAMERA,
	  allowEdit: true,
	  encodingType: Camera.EncodingType.JPEG,
	  saveToPhotoAlbum: true,
	  correctOrientation:true
	};

	/**
	 * b64toBlob
	 * @param {string} b64Data
	 * @param {string} contentType
	 * @param {number} sliceSize
	 * @returns {blob} 
	 */
	cameraService.base64toBlob = function (b64Data, contentType, sliceSize) {
	  contentType = contentType || '';
	  sliceSize = sliceSize || 512;

	  var byteCharacters = atob(b64Data);
	  var byteArrays = [];
	  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	    var slice = byteCharacters.slice(offset, offset + sliceSize);
	    var byteNumbers = new Array(slice.length);
	    for (var i = 0; i < slice.length; i++) {
	      byteNumbers[i] = slice.charCodeAt(i);
	    }
	    var byteArray = new Uint8Array(byteNumbers);
	    byteArrays.push(byteArray);
	  }
	  var blob = new Blob(byteArrays, {type: contentType});
	  return blob;
	};
	
	/**
	 * getNewImage
	 */
	cameraService.getPicture = function() {
	  $log.log('cameraService.getPicture');
          var deferred = $q.defer();
          console.log(cameraService.options);
	  cameraService.options.sourceType = Camera.PictureSourceType.CAMERA;
	  $cordovaCamera.getPicture(cameraService.options).then(
            function(resp) {
	      var blob = cameraService.base64toBlob(resp, "image/jpeg");
	      blob.name = 'image.jpeg';
              deferred.resolve(blob);
            },
            function(resp) {
              deferred.reject(resp);
            }
          );
          return deferred.promise;
	}; 

	/**
	 * getFromGallery
	 * @returns {promise} 
	 */
	cameraService.getFromGallery = function() {
	  $log.log('cameraService.getFromGallery');
	  cameraService.options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
          console.log(cameraService.options);
          var deferred = $q.defer();
	  $cordovaCamera.getPicture(cameraService.options).then(
            function(resp) {
	      var blob = cameraService.base64toBlob(resp, "image/jpeg");
	      blob.name = 'image.jpeg';
              deferred.resolve(blob);
            },
            function(resp) {
              deferred.reject(resp);
            }
          );
          return deferred.promise;
	}; 
	
	/**
	 * onPhotoFileSuccess
	 * @param {object} imageData
	 */
	cameraService.onPhotoFileSuccess = function(imageData) {
	  $log.log('onPhotoFileSuccess');
	  var imgBlob = "data:image/jpeg;base64," + imageData;
	  $log.log(imgBlob);
	};

	/**
	 * onFail
	 * @param {string} message
	 */
	cameraService.onFail = function(message) {
	  $log.log('Failed because: ' + message);
	};

	/**
	 * init
	 */
	cameraService.init = function() {
	  $log.log('cameraService.init');
	};
	cameraService.init();

	return cameraService;
      }
    ]
  );
})(console, angular);
