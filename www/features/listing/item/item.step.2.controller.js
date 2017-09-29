/**
 * @fileOverview item view controller 
 * @name item.step.2.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (fabric, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'item.step.2.controller',
    [
      '$window',
      '$injector',
      '$log',
      '$state',
      '$timeout',
      'imageService',
      'itemService',
      'categories',
      '$http',
      function($window, $injector, $log, $state, $timeout, imageService, itemService, categories, $http) {
        var $thisitem = this;
        $thisitem.activeview = 2;
        /**
         * private
         */
        
        /**
         *  public 
         */

	var control = {};
	var isCordova = typeof($window.cordova)==="undefined" ? false : true;
	var cameraService = null;
	if (isCordova) {
	  cameraService = $injector.get('cameraService');
	}

	var cameraSelector = false;

        /**
         * closeSelector
         */
	var closeSelector = function() {
	  $this.cameraSelector=false;
	};
	
        /**
         * openSelector
         */
	var openSelector = function() {
	  $this.cameraSelector=true;
	};
	
	/**
	 * getFromGallery from device camera
	 * @param {object} $event
	 */
	var getFromGallery = function($event) {
	  $this.cameraSelector=false;
	  cameraService.getFromGallery().then(
	    function(blob) {
	      $this.control.flow.addFile(blob);
              closeSelector();
	    },
            function(err) {
	      $log.log(err);
	    }
	  );
	};
	
	/**
	 * getPhoto from device camera
	 * @param {object} $event
	 */
	var getPhoto = function($event) {
	  $this.cameraSelector=false;
	  cameraService.getPicture().then(
	    function(blob) {
	      $this.control.flow.addFile(blob);
              closeSelector();
	    },
            function(err) {
	      $log.log(err);
	    }
	  );
	};

        var model = itemService.model.get();
        var upload = {};
        upload.done = itemService.getUploadStatus();

        var imageUrl = "";
        var previewImage = {};
        var images = {};
        images._images = [];

        /**
         * Initialize images list
         */
        images.init = function() {
          if (model.images) {
            images._images=model.images;
	    for (var i=0; i<images._images.length; i++) {
	      images._images[i].progress=100;
	    }
          }
        };

        /**
         * images.get
         * @returns {array} 
         */
        images.get = function() {
          $log.log('images.get');
          var arr=[];
          for (var i=0; i<images._images.length; i++) {
            arr.push({url:images._images[i].url});
          }
          return arr;
        };

        /**
         * images.edit
         * @param {object} $file
         */
        images.edit = function($file) {
          $log.log('images.edit');
          previewImage = $file;
          itemService.image.set($file.base64data);          
          $timeout(function() {
            cropper.open(itemService.image.get());
          }, 1000);
        };

        images.remove = function($file) {
          console.log('images.delete');
          imageService.images.remove($file);
          for (var i=0; i<images._images.length; i++) {
            if ($file.id==images._images[i].id) {
              delete images._images[i];
            }
          }
          var obj = imageService.images.list();
          var arr = Object.keys(obj).map(function (key) { return obj[key]; });
          images._images = arr;
        };

        var flow = {};
        flow.filesSubmitted = function($files, $event, $flow) {
          console.log('flow-files-submitted', arguments);
          $flow.upload();
        };

        flow.fileSuccess = function($file, $message, $flow) {
          console.log('flow-file-success');
          var oMessage = JSON.parse($message);
          imageService.images.update($file, oMessage);
          var obj = imageService.images.list();
          var arr = Object.keys(obj).map(function (key) { return obj[key]; });
          images._images = arr;
        };

        /**
         * fileProgress
         * @param {object} $file
         * @param {object} $flow
         * @returns {object} 
         */
        flow.fileProgress = function($file, $flow) {
          console.log('flow-file-progress');
          $timeout(function() {
            imageService.images.update($file);
            var obj = imageService.images.list();
            var arr = Object.keys(obj).map(function (key) { return obj[key]; });
            images._images = arr;
          }, 250);
        };

        /**
         * fileAdded
         * @param {object} $file
         * @param {object} event
         */
        flow.fileAdded = function($file, event) {
          console.log('flow-file-added');
          itemService.setUploadStatus(false);
          upload.done = itemService.getUploadStatus();
          var oFReader = new FileReader();
          oFReader.readAsDataURL($file.file);
          oFReader.onload=function(ofr_event) {
            $file.base64data=ofr_event.target.result;
            imageService.images.add($file);
          };
        };

        flow.filesAdded = function($files, $message, $flow) {
          console.log('flow-files-added', arguments);
        };

        flow.fileRetry = function($file, $flow) {
          console.log('flow-file-retry', arguments);
        };

        flow.fileError = function($file, $message, $flow) {
          console.log('flow-file-error', arguments);
        };

        flow.error = function($file, $message, $flow) {
          console.log('flow-error', arguments);
        };

        flow.complete = function($file, $flow) {
          console.log('flow-complete');
          itemService.setUploadStatus(true);
          upload.done = itemService.getUploadStatus();
        };

        flow.uploadStarted = function($file, $flow) {
          console.log('flow-upload-started', arguments);
        };

        flow.progress = function($file, $flow) {
          console.log('flow-progress', arguments);
        };

        var dragControlListeners = {
          accept: function (sourceItemHandleScope, destSortableScope) {
            return true;
          },
          itemMoved: function (event) {
            console.log('itemMoved');
          },
          orderChanged: function(event) {
            console.log('orderChanged');
            imageService.images.reorder(images._images);
          }
        };

        var cropper = {};
        cropper.visible=false;
        cropper.image={};

        cropper.cloud_upload = function(base64data, identifier) {
          return $http({
            method: "POST",
            data: {
              base64data: base64data,
              identifier: identifier
            },
            url: "https://reeltrail.com/rtimages/cloud_upload"
          });
        };

        cropper.upload = function() {
          cropper.cloud_upload(cropper.image.base64data, previewImage.identifier).then(
            function(res) {
              var file = {};
              oldId = previewImage.identifier;
              file.identifier = res.data.identifier;
              file.url = res.data.url;
              file.base64data = cropper.image.base64data;
              imageService.images.setCropped(file, oldId);
              cropper.visible=false;
            },
            function(err) {
              cropper.visible=false;
            }
          );
        };

        cropper.crop = function(img) {
          $timeout(function() {
            cropper.image.base64data=img;
          }, 1);
        };

        cropper.open = function(img) {
          cropper.visible=true;
          cropper.image.base64data=img;
        };

        cropper.close = function() {
          cropper.visible=false;
        };

        /**
         * back
         */
        var back = function() {
          model.thumbnails=images.get();
          model.images=images.get();
          itemService.model.set(model, 'internal');
          $state.go('item-wizard');
        };

        /**
         * next
         */
        var next = function() {
          model.thumbnails=images.get();
          model.images=images.get();
          itemService.model.set(model, 'internal');
          $state.go('item-wizard.step3');
        };

        /**
         * init
         */
        var init = function() {
          $log.log('item.step.2.controller.init');
          images.init();
	  if (images.get().length>0) {
	    upload.done=true;
	  }
        };
        init();

        /**
         * exports
         */
        angular.extend(
          this, {
	    cameraSelector:cameraSelector,
	    openSelector:openSelector,
	    closeSelector:closeSelector,
            control:control,
            isCordova:isCordova,
            getPhoto:getPhoto,
            getFromGallery:getFromGallery,
            model:model,
            categories:categories,
            dragControlListeners:dragControlListeners,
            imageUrl:imageUrl,
            images:images,
            flow:flow,
            cropper:cropper,
            back:back,
            next:next,
            init:init,
            upload:upload
          }
        );
        var $this=this;
      }
    ]
  );
})(fabric, angular);
