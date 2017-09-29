/**
 * @fileOverview item detail view controller
 * @name item.detail.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'item.detail.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'watches',
      'watching',
      'user',
      'listing',
      'watchesService',
      'userService',
      'cartService',
      'itemService',
      'jkService',
      'topService',
      'messageService',
      function($log, $state, $timeout, watches, watching, user, listing, watchesService, userService, cartService, itemService, jkService, topService, messageService) {
        itemService.model.set(listing.data);
        var model = itemService.model.get();
	itemService.id.set(model._id);
	var watchCount = watches.data.count;
	var isUserWatching = watching.data.watching;
        if (isUserWatching) {
          model.watchId=watching.data.watchId;
        }
        var listingId = itemService.id.get();
        var cart = {};
        cart.quantity=1;
        var _isAdding=false;
	var $this=this;
	
        /**
         * add
         */
        cart.add = function() {

          $state.go('home.cart');
          
          if (_isAdding===false) {
            _isAdding=true;
            var listingId=itemService.id.get();
            cartService.items.db.add(listingId, cart.quantity).then(
              function (resp) {
                _isAdding=false;
                itemService.cart.add(cart.quantity);
                // $state.go('home.cart');
                console.log("home.cart");
              },
              function (resp) {
                _isAdding=false;
                console.log(resp);
              }
            );
          }
        };

        /**
         * messageSeller
         * @param {string} username
         * @param {string} userId
         */
        var messageSeller = function(username, userId) {
          messageService.goToMessaging(username, userId, listingId);
        };

        /**
         * goToOffers
         */
        var goToOffers = function(listingId){
          console.log('goToOffers', listingId);
          $state.go("home.offer", {id: listingId});
        };

        /**
         * totalViewcount
         * @returns {number}
         */
        var totalViewCount = function() {
          return model.viewCount.authenticated + model.viewCount.notAuthenticated;
        };

        /**
         * edit
         */
        var edit = function() {
          $state.go('home.item.edit', {id:itemService.id.get()});
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
          itemService.remove().then(
            function(resp) {
              $timeout(function() {
                $state.go('profile.items');
              }, 1);
            },
            function(resp) {
              console.log(resp);
            }
          );
        };

        /**
         * convert
         * @param {number} price
         * @returns {number}
         */
        var convert = function(price) {
          return (price/100);
        };

        /**
         * user.isOwner
         * @returns {boolean}
         */
        var isOwner = function() {
          return userService.model._model._id==model.postedByUserId._id;
        };

        /**
         * watch
         */
        var watch = function() {
          var listingId=itemService.id.get();
          watchesService.add(listingId).then(
            function(resp) {
	      $this.isUserWatching=true;
	      isUserWatching=true;
            },
            function(resp) {
            }
          );
        };

        /**
         * unwatch
         */
        var unwatch = function(watchId) {
          var listingId=itemService.id.get();
          watchesService.remove(watchId).then(
            function(resp) {
              isUserWatching=false;
              $this.isUserWatching=false;
            },
            function(resp) {
              console.log(resp);
            }
          );
        };

        /**
         * onSwipeLeft
         */
        var onSwipeLeft = function() {
          jkService.navigateRight();
        };

        /**
         * onSwipeRight
         */
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
          }
          return false;
        };

        cart.addQuantity = function() {
          cart.quantity++;
          console.log(cart.quantity);
        };

        cart.removeQuantity = function() {
          cart.quantity--;
          console.log(cart.quantity);
        };	

        /**
         * init
         */
        var init = function() {
          $log.log('item.detail.controller.init');
          topService.refresh("back", {type:"Listing", category:model.categories[0]});
        };

        init();

        angular.extend(this, {
	  listingId:listingId,
	  watchCount:watches.data.count,
	  isUserWatching:isUserWatching,
          watch:watch,
          unwatch:unwatch,
          isOwner:isOwner,
          convert:convert,
          edit:edit,
          refund:refund,
          remove:remove,
          model:model,
          cart:cart,
          onSwipeLeft:onSwipeLeft,
          onSwipeRight:onSwipeRight,
          convertCurrency:convertCurrency,
          isItemOwnedByUser:isItemOwnedByUser,
          goToOffers:goToOffers,
          messageSeller:messageSeller,
          user:user.data
        });
      }
    ]
  );

  RTMobileApp.controller(
    'item.detail.image.modal.controller',
    [
      'imageModalService',
      function(imageModalService) {
	angular.extend(this, {
	  imageUrl: imageModalService.get()
	});
      }
    ]
  );
  
  RTMobileApp.factory(
    'imageModalService',
    [
      function() {
	var imageModalService = {};
	imageModalService.imageUrl = "";
	imageModalService.set = function(url) {
	  imageModalService.imageUrl = url;
	};
	imageModalService.get = function() {
	  return imageModalService.imageUrl;
	};
	return imageModalService;
      }
    ]
  );

  RTMobileApp.controller(
    'item.detail.image.controller',
    [
      '$modal',
      'imageModalService',
      function($modal, imageModalService) {

	var modal = {};
	var imageUrl = "";

	var previewModal = $modal(
	  {controller: "item.detail.image.modal.controller",
	   controllerAs: "idimc",
	   templateUrl: 'features/details/item/item.modal.html',
	   show: false});

	var showModal = function(url) {
	  imageModalService.set(url);
	  previewModal.$promise.then(previewModal.show);
	};

	var hideModal = function() {
	  previewModal.$promise.then(previewModal.hide);
	};

	/**
	 * init
	 */
	var init = function() {
	  $log.log('item.modal.controller.init');
	};

	angular.extend(this, {
	  modal:modal,
	  showModal:showModal
	});
      }
    ]
  );
  
})(console, angular);
