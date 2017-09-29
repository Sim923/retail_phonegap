/**
 * @fileOverview
 * @name item.edit.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, fabric, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'item.edit.controller',
    [
      '$window',
      '$injector',
      '$log',
      '$state',
      '$timeout',
      'imageService',
      'itemService',
      'options',
      'optionsPrices',
      'listing',
      'countries',
      'categories',
      '$http',
      function($window, $injector, $log, $state, $timeout, imageService, itemService, options, optionsPrices, listing, countries, categories, $http) {
	
	var control = {};
	var isCordova = typeof($window.cordova)==="undefined" ? false : true;
	var cameraService = null;
	if (isCordova) {
	  cameraService = $injector.get('cameraService');
	}

        var agreeListingOptionsNoRefund=false;
        itemService.model.set(listing.data);
        var model = itemService.model.get();
        itemService.images.set(model.images);
        model.images = itemService.images.get();
	var oOptions = angular.copy(options.data);
        var imageUrl = "";
        var previewImage = '';
        var images = {};
        images._images = [];

	var returnPolicies = [
          {id:0, name:"No Returns"},
          {id:3, name:"3 Days"},
          {id:4, name:"4 Days"},
          {id:5, name:"5 Days"},
          {id:6, name:"6 Days"},
          {id:7, name:"7 Days"},
          {id:8, name:"8 Days"},
          {id:9, name:"9 Days"},
          {id:10, name:"10 Days"},
          {id:11, name:"11 Days"},
          {id:12, name:"12 Days"},
          {id:13, name:"13 Days"},
          {id:14, name:"14 Days"}
        ];

	var cameraSelector = false;
	
	var openSelector = function() {
	  $this.cameraSelector=true;
	};

	var closeSelector = function() {
	  $this.cameraSelector=false;
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

        /**
         * Initialize images list
         */
        images.init = function() {
          imageService.images.reset();
          console.log(model.images);
          if (model.images) {
            for (var i=0; i < model.images.length; i++) {
              var image = model.images[i];
              if (image.url) {
                var o = {
                  id : model.images[i]._id,
                  url : model.images[i].url,
                  uniqueIdentifier : model.images[i]._id,
                  name : model.images[i].url.split('/').pop(),
                  progress : 100
                };
                images._images.push(o);
                imageService.images.add(o);
              }
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
          $log.log('images.edit', $file);
          if($file.base64data === undefined) {
            imageService.images.encode($file.url, function(base64data) {
              $file.base64data = base64data;
              itemService.image.set($file);
              $timeout(function() {
                cropper.open(itemService.image.get().base64data);
              }, 1);
            });
          } else {
            itemService.image.set($file);
            $timeout(function() {
              cropper.open(itemService.image.get().base64data);
            }, 1);
          }
        };

        /**
         * images.remove
         * @param {object} $file
         */
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
          model.images = images._images;
        };

        var flow = {};

        /**
         * flow.filesSubmitted
         * @param {object} $files
         * @param {object} $event
         * @param {object} $flow
         */
        flow.filesSubmitted = function($files, $event, $flow) {
          console.log('flow-files-submitted', arguments);
          $flow.upload();
        };

        /**
         * flow.fileSuccess
         * @param {object} $file
         * @param {object} $message
         * @param {object} $flow
         */
        flow.fileSuccess = function($file, $message, $flow) {
          console.log('flow-file-success');
          var oMessage = JSON.parse($message);
          imageService.images.update($file, oMessage);
          var obj = imageService.images.list();
          var arr = Object.keys(obj).map(function (key) { return obj[key]; });
          images._images = arr;
          model.images = images._images;
        };

        /**
         * flow.fileProgress
         * @param {object} $file
         * @param {object} $flow
         */
        flow.fileProgress = function($file, $flow) {
          console.log('flow-file-progress', $file);
          imageService.images.update($file);
          var obj = imageService.images.list();
          var arr = Object.keys(obj).map(function (key) { return obj[key]; });
          images._images = arr;
        };

        /**
         * flow.fileAdded
         * @param {object} $file
         * @param {object} event
         */
        flow.fileAdded = function($file, event) {
          console.log('flow-file-added', $file);
          var oFReader = new FileReader();
          oFReader.readAsDataURL($file.file);
          oFReader.onload=function(ofr_event) {
            $file.base64data=ofr_event.target.result;
            imageService.images.add($file);
          };
        };

        /**
         * flow.filesAdded
         * @param {object} $files
         * @param {object} $message
         * @param {object} $flow
         */
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
          cropper.cloud_upload(cropper.image.base64data, itemService.image.get().identifier).then(
            function(res) {
              var file = {};
              console.log(itemService.image.get());
              file.id = res.data.identifier;
              file.identifier = res.data.identifier;
              file.url = res.data.url;
              file.name = res.data.identifier;
              file.progress = 100;
              imageService.images.setCropped(file, itemService.image.get().id);
              var obj = imageService.images.list();
              var arr = Object.keys(obj).map(function (key) { return obj[key]; });
              images._images = arr;
              model.images = images._images;
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
          console.log(cropper);
        };

        cropper.close = function() {
          cropper.visible=false;
        };

        /**
         * cancel
         */
        var cancel = function() {
          $log.log('item.edit.controller.cancel');
          $state.go('home.item', {iid:itemService.id.get()});
        };

        /**
         * next
         */
        var update = function() {
          for(var key in model) {
            if(key == "categories") {
              model.mainCategory = model[key][0]._id;
              model.subcategory1 = model[key][1]._id;
              model.subcategory2 = model[key][2]._id;
            }
          }
          itemService.model.set(model, "edit");
          
          itemService.update().then(
            function(resp) {
              var lo=oOptions.options; console.log('lo', lo);
              var opts = resp.data.listing.options; console.log('opts', opts);
              var destination = (opts.highlight && !lo.highlight.isActive) || (opts.viewCounter && !lo.viewCounter.isActive) || (opts.boldface && !lo.boldface.isActive) || (opts.showcase && !lo.showcase.isActive);
              if (destination) {
		$state.go('item-wizard.options');
              } else {
		$state.go('home.item', {id:model._id});
	      }
            },
            function(resp) {
	      console.log('Problem!');
            }
          );
        };

        /**
         * init
         */
        var init = function() {
          $log.log('item.edit.controller.init');
          images.init();
        };
        init();

	//
        // Exports
        //
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
            returnPolicies:returnPolicies,
            countries:countries.data,
            categories:categories.data,
	    options:oOptions,
            optionsPrices:optionsPrices.data,
            dragControlListeners:dragControlListeners,
            imageUrl:imageUrl,
            images:images,
            flow:flow,
	    agreeListingOptionsNoRefund:agreeListingOptionsNoRefund,
            cropper:cropper,
            update:update,
            cancel:cancel
          }
        );
        var $this=this;
      }
    ]
  );
})(console, fabric, angular);
