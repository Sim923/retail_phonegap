/**
 * @fileOverview
 * @name profile.details.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'profile.details.controller',
    [
      '$injector',
      '$window',
      '$log',
      'timezones',
      'user',
      'profileDetailsService',
      '$state',
      '$timeout',
      'imageService',
      'userService',
      '$modal',
      'profileImageModalService',
      'profileService',
      'primary',
      'address',
      function($injector, $window, $log, timezones, user, profileDetailsService, $state, $timeout, imageService, userService, $modal, profileImageModalService, profileService, primary, address) {

	var control = {};
	var isCordova = typeof($window.cordova)==="undefined" ? false : true;
	var cameraService = null;
	if (isCordova) {
	  cameraService = $injector.get('cameraService');
	}
	var model = angular.copy(user.data);
	var primaryAddress = primary.data;

	profileDetailsService.model.set(model);
	profileDetailsService.images.set(model.images);

	model._id = userService.model.get()._id;
	model.images = user.data.images ? user.data.images : [];
	model.profileImage = profileDetailsService.model.get().profileImage;

	if (Object.keys(model.dob).length === 0) {
	  angular.extend(model, {yearOfBirth:{value:""}});
	  angular.extend(model, {monthOfBirth:{value:""}});
	  angular.extend(model, {dayOfBirth:{value:""}});
	} else {
	  angular.extend(model, {yearOfBirth:{value:model.dob.year.toString()}});
	  angular.extend(model, {monthOfBirth:{value:model.dob.month.toString()}});
	  angular.extend(model, {dayOfBirth:{value:model.dob.day.toString()}});
	}
	angular.extend(model, {type:{value:model.entityType}});

	var accountTypes = [{value:'individual', text:'Individual'}, {text:'Company', value:'company'}];

	var years = [];

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
	 * visibleYears
	 * @returns {array}
	 */
	var visibleYears = function() {
	  var years = [];
	  var top = new Date().getFullYear() - 12;
	  var bottom = top - 100;
	  for (var i=top; i > bottom; i--) {
	    years.push({value:i, text:i});
	  }
	  return years;
	};

	years = visibleYears();
	var months=[
	  {value:'1', text:'January'}, {value:'2', text:'February'}, {value:'3', text:'March'},
	  {value:'4', text:'April'}, {value:'5', text:'May'}, {value:'6', text:'June'},
	  {value:'7', text:'July'}, {value:'8', text:'August'}, {value:'9', text:'September'},
	  {value:'10', text:'October'}, {value:'11', text:'November'}, {value:'12', text:'December'}
	];
	var days=[];

	/**
	 * updateDays
	 * @param {number} nv
	 * @returns {Date}
	 */
	var updateDays = function(nv) {
	  var getDaysInMonth=(
	    function() {
	      return function(month, year){
		return new Date(year, month, 0).getDate();
	      };
	    }
	  )();
	  var visibleDays=function() {
	    days.splice(0, days.length);
	    var month=parseInt(nv);
	    var year=parseInt(model.yearOfBirth.value);
	    var top=getDaysInMonth(month, year);
	    for (var i=1; i<=top; i++) {
	      var str = "" + i;
	      var pad = "00";
	      var ans = pad.substring(0, pad.length - str.length) + str;
	      days.push({value:i, text:ans});
	    }
	  };
	  visibleDays();
	};

	/**
	 * update
	 */
	var update = function() {
	  console.log('profile.details.controller.update');
	  model.entityType=model.type.value;
	  model.dob.year=model.yearOfBirth.value;
	  model.dob.month=model.monthOfBirth.value;
	  model.dob.day=model.dayOfBirth.value;
	  model.images = profileDetailsService.images.get();
	  profileDetailsService.update(model).then(
	    function(resp) {
	      console.log(resp);
	      $state.go("profile");
	    },
	    function(resp) {
	      console.log(resp);
	    }
	  );
	};

	/**
	 * cancel
	 */
	var cancel=function() {
	  $state.go('profile');
	};

	var flow = {};
	/**
	 * flow.filesSubmitted
	 * @param {array} $files
	 * @param {object} $event
	 * @param {object} $flow
	 */
	flow.filesSubmitted = function($files, $event, $flow) {
	  console.log('flow-files-submitted', $files, $event, $flow);
	  $flow.upload();
	};

	flow.fileSuccess = function($file, $message, $flow) {
	  console.log('flow-file-success');
	  var oMessage = JSON.parse($message);
	  imageService.images.update($file, oMessage);
	  var obj = imageService.images.list();
	  var arr = Object.keys(obj).map(function (key) { return obj[key]; });
	  console.log(arr);
	  profileDetailsService.images.update(arr[arr.length-1]);
	  console.log(profileDetailsService.images.get());
	  var imageUrl = arr[(arr.length-1)].url;
	  profileDetailsService.model.profileImageUpload(imageUrl).then(
	    function(resp) {
	      console.log(resp);
	      $timeout(function() {
		model.profileImage = imageUrl;
		profileDetailsService.model.update(model);
		profileDetailsService.update(profileDetailsService.model.get()).then(
		  function(res) {
		    console.log(res);
		    profileDetailsService.images.set(res.data.images);
		  },
		  function(err) {
		    console.log(err);
		  }
		);
	      }, 1);
	    },
	    function(err) {
	      console.log(err);
	    }
	  );
	};

	flow.fileProgress = function($file, $flow) {
	  console.log('flow-file-progress');
	  imageService.images.update($file);
	  var obj = imageService.images.list();
	  var arr = Object.keys(obj).map(function (key) { return obj[key]; });
	};

	flow.fileAdded = function($file, event) {
	  console.log('flow-file-added', $file, event);
	  upload.done=false;
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
	  upload.done=true;
	};

	flow.uploadStarted = function($file, $flow) {
	  console.log('flow-upload-started', arguments);
	};

	flow.progress = function($file, $flow) {
	  console.log('flow-progress', arguments);
	};
	var upload = {};
	upload.done = true;
	/**
	 * init
	 */
	var init = function() {
	  $log.log('profile.details.controller.init');
	  updateDays(model.dob.month);
	};
	init();

	var modal = {};
	var imageUrl = "";

	var previewModal = $modal(
	  {
	    controller: "profile.detail.carousel.controller",
	    controllerAs: "pdcc",
	    templateUrl: 'features/profile/details.modal.html',
	    show: false
	  }
	);

	var showModal = function(url) {
	  previewModal.$promise.then(previewModal.show);
	};

	var hideModal = function() {
	  previewModal.$promise.then(previewModal.hide);
	};

	angular.extend(
	  this,
	  {
	    cameraSelector:cameraSelector,
	    openSelector:openSelector,
	    closeSelector:closeSelector,
	    isCordova:isCordova,
	    getPhoto:getPhoto,
            getFromGallery:getFromGallery,
	    upload:upload,
	    model:model,
	    timezones:timezones.data,
	    flow:flow,
	    update:update,
	    cancel:cancel,
	    showModal:showModal,
	    hideModal:hideModal,
	    accountTypes:accountTypes,
	    updateDays:updateDays,
	    years:years,
	    months:months,
	    days:days,
	    primaryAddress:primaryAddress
	  }
	);
	var $this=this;
      }
    ]
  );

  RTMobileApp.controller(
    'profile.detail.carousel.controller',
    [
      'profileDetailsService',
      'jkService',
      function(profileDetailsService, jkService) {

	var images = profileDetailsService.images.get();

	var onSwipeLeft = function() {
	  jkService.navigateRight();
	};

	var onSwipeRight = function() {
	  jkService.navigateLeft();
	};

	angular.extend(this, {
	  images: images,
	  onSwipeLeft:onSwipeLeft,
	  onSwipeRight:onSwipeRight
	});
      }
    ]
  );

  RTMobileApp.controller(
    'details.carousel.modal.controller',
    [
      'profileDetailsService',
      'profileImageModalService',
      '$timeout',
      '$log',
      '$state',
      function(profileDetailsService, profileImageModalService, $timeout, $log, $state) {

	var cropper = {};
	cropper.visible=false;
	cropper.image = profileImageModalService.get();
	cropper.done = false;
	var model = profileDetailsService.model.get();
	cropper.upload = function() {
	  var base64data = cropper.image.base64data;
	  var identifier = cropper.image._id;
	  profileDetailsService.images.cloud_upload(base64data, identifier).then(
	    function(resp) {
	      $timeout(function() {
		console.log(resp);
		delete resp.data.cloud_deleted;
		resp.data.identifier = identifier;
		profileDetailsService.images.change(resp.data);
		profileDetailsService.model.update(model);
		profileDetailsService.update(profileDetailsService.model.get()).then(
		  function(res) {
		    $timeout(function() {
		      console.log(res);
		      profileImageModalService.set(resp.data.url);
		      cropper.image.url = resp.data.url;
		      cropper.visible=false;
		    }, 1);
		  },
		  function(err) {
		    console.log(err);
		  }
		);
	      }, 1);
	    },
	    function(err) {
	      console.log(err);
	      cropper.visible=false;
	    }
	  );

	};

	cropper.crop = function(base64data) {
	  $timeout(function() {
	    cropper.image.base64data=base64data;
	    cropper.done = true;
	  }, 1);
	};

	cropper.open = function() {
	  console.log("cropper.open.init");
	  cropper.visible=true;
	};

	cropper.close = function() {
	  cropper.visible=false;
	};

	cropper.setProfileImage = function() {
	  console.log("cropper.setProfileImage.init");
	  model.profileImage = cropper.image.url;
	  profileDetailsService.model.set(model);
	  profileDetailsService.model.update(model);
	  profileDetailsService.update(profileDetailsService.model.get()).then(
	    function(res) {
	      $timeout(function() {
		console.log(res);
		$state.reload();
	      }, 1);
	    },
	    function(err) {
	      console.log(err);
	    }
	  );
	};

	cropper.deleteImage = function(image) {
	  profileDetailsService.images.delete(image);
	  profileDetailsService.model.update(model);
	  profileDetailsService.update(profileDetailsService.model.get()).then(
	    function(res) {
	      $timeout(function() {
		console.log(res);
		$state.reload();
	      }, 1);
	    },
	    function(err) {
	      console.log(err);
	    }
	  );
	};

	var init = function() {
	  $log.log('details.carousel.modal.controller');
	};
	init();

	angular.extend(this, {
	  cropper: cropper
	});
      }
    ]
  );

  RTMobileApp.factory(
    'profileImageModalService',
    [
      function() {
	var profileImageModalService = {};
	profileImageModalService.image = {};
	profileImageModalService.set = function(image) {
	  profileImageModalService.image = image;
	};
	profileImageModalService.get = function() {
	  return profileImageModalService.image;
	};
	return profileImageModalService;
      }
    ]
  );

  RTMobileApp.controller(
    'profile.details.carousel.template.controller',
    [
      'profileImageModalService',
      '$modal',
      function(profileImageModalService, $modal) {

	var modal = {};
	// var imageUrl = "";

	var previewModal = $modal(
	  {controller: "details.carousel.modal.controller",
	   controllerAs: "dcmc",
	   templateUrl: 'features/profile/details.carousel.modal.html',
	   show: false});

	var showModal = function(img) {
	  console.log("showModal", img);
	  profileImageModalService.set(img);
	  previewModal.$promise.then(previewModal.show);
	};

	var hideModal = function() {
	  previewModal.$promise.then(previewModal.hide);
	};

	/**
	 * init
	 */
	var init = function() {
	  $log.log('profile.details.carousel.template.controller.init');
	};

	angular.extend(this, {
	  modal:modal,
	  showModal:showModal
	});
      }
    ]
  );
})(console, angular);
