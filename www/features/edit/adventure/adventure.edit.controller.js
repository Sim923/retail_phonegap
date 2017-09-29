/**
 * @fileOverview
 * @name adventure.edit.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular, fabric, google) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'adventure.edit.controller',
    [
      '$window',
      '$injector',
      '$log',
      '$state',
      '$timeout',
      'NgMap',
      'adventure',
      'adventureOptions',
      'adventuresOptionsPrices',
      'imageService',
      'adventureService',
      'countries',
      'categories',
      function AdventureEditController($window, $injector, $log, $state, $timeout, NgMap, adventure, adventureOptions, adventuresOptionsPrices, imageService, adventureService, countries, categories) {

	var control = {};
	var isCordova = typeof($window.cordova)==="undefined" ? false : true;
	var cameraService = null;
	if (isCordova) {
	  cameraService = $injector.get('cameraService');
	}
	var agreeListingOptionsNoRefund=false;
	var oAdventure = adventure.data;
	var oOptions = angular.copy(adventureOptions.data);
        adventureService.model.set(adventure.data);
        var model = adventureService.model.get();
        adventureService.images.set(model.images);
        model.images = adventureService.images.get();
        var imageUrl = "";
        var previewImage = '';
        var images = {};
        images._images = [];

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
              adventureService.image.set($file);
              $timeout(function() {
                cropper.open(adventureService.image.get().base64data);
              }, 1);
            });
          } else {
            adventureService.image.set($file);
            $timeout(function() {
              cropper.open(adventureService.image.get().base64data);
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
          console.log('flow-file-progress');
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
          console.log('flow-file-added');
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
        };

        flow.uploadStarted = function($file, $flow) {
          console.log('flow-upload-started', arguments);
        };

        flow.progress = function($file, $flow) {
          console.log('flow-progress', arguments);
        };

        var dragControlListeners = {
          accept: function (sourceAdventureHandleScope, destSortableScope) {
            return true;
          },
          adventureMoved: function (event) {
            console.log('adventureMoved');
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
          cropper.cloud_upload(cropper.image.base64data, adventureService.image.get().identifier).then(
            function(res) {
              var file = {};
              console.log(adventureService.image.get());
              file.id = res.data.identifier;
              file.identifier = res.data.identifier;
              file.url = res.data.url;
              file.name = res.data.identifier;
              file.progress = 100;
              imageService.images.setCropped(file, adventureService.image.get().id);
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

        var map = null;
        var place = null;
        var location = {};

        /**
         * mapInit
         * @param {object} map
         */
        var mapInit = function(map) {
          console.log('adventure.edit.controller.mapInit');
          location=angular.copy(model.location);
          var lat = model.location.lat;
          var lng = model.location.lng;
          var latlng = new google.maps.LatLng(lat, lng);
          map.setCenter(latlng);
        };

        var placeChanged = function() {
          console.log('adventure.edit.controller.placeChanged');
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
         * cancel
         */
        var cancel = function() {
          $log.log('adventure.edit.controller.cancel');
          $state.go('home.adventure', {aid:adventureService.id.get()});
        };

        /**
         * update
         */
        var update = function() {
          for(var key in model) {
            if(key == "categories") {
              model.mainCategory = model[key][0]._id;
              model.subcategory1 = model[key][1]._id;
              model.subcategory2 = model[key][2]._id;
            }
          }
          model.location=angular.copy(location);
          adventureService.model.set(model, "edit");
          $log.log('adventure.edit.controller.next');
          adventureService.update().then(
            function(resp) {
	      var lo=oOptions.options; 
              var opts = resp.data.adventure.options;
              var destination = (opts.highlight && !lo.highlight.isActive) || (opts.viewCounter && !lo.viewCounter.isActive) || (opts.boldface && !lo.boldface.isActive) || (opts.showcase && !lo.showcase.isActive);
              if (destination) {
		$state.go('adventure-wizard.options');
              } else {
		$state.go('home.adventure', {id:model._id});
	      }
            },
            function(resp) {
            }
          );
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

        /**
         * init
         */
        var init = function() {
          $log.log('adventure.edit.controller.init');
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
            canDecrement:canDecrement,
            canIncrement:canIncrement,
            canEnter:canEnter,
            increment:increment,
            decrement:decrement,
            model:model,
	    adventure:oAdventure,
            countries:countries.data,
            categories:categories.data,
	    options:oOptions,
            adventuresOptionsPrices:adventuresOptionsPrices.data,
            dragControlListeners:dragControlListeners,
            imageUrl:imageUrl,
            images:images,
            flow:flow,
            cropper:cropper,
            mapInit:mapInit,
            placeChanged:placeChanged,
	    agreeListingOptionsNoRefund:agreeListingOptionsNoRefund,
            update:update,
            cancel:cancel
          }
        );
        var $this=this;
      }
    ]
  );
})(console, angular, fabric, google);
