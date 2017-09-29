/**
 * @fileOverview cart service
 * @name cart.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'cartService',
    [
      '$log',
      '$http',
      'userService',
      '$state',
      'rtsocket',
      'topService',
      'baseurlService',
      function($log, $http, userService, $state, rtsocket, topService, baseurlService) {
        var cartService = {};
        cartService.items = {};
        cartService.items._items = [];
        cartService.items.db = {};

        var baseUrl = baseurlService.address;
        /**
         * items.db.get
         * @returns {callback}
         */
        cartService.items.db.get = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/users/cart",
            headers: {
              "Content-Type": "application/json"
            }
          });
        };
        /**
         * items.db.add
         * @param {string} listingId
         * @param {number} quantity
         * @returns {callback}
         */
        cartService.items.db.add = function(listingId, quantity) {
          console.log('cartService.add', listingId, quantity);
          return $http({
            method: "POST",
            data: {
              listingId:listingId,
              quantity:quantity
            },
            url: baseUrl+"/rtapi/v1/cart/"
          });
        };
        /**
         * items.db.delete
         * @param {string} listingId
         * @returns {callback}
         */
        cartService.items.db.delete = function(listingId) {
          return $http({
            method: "DELETE",
            url: baseUrl+"/rtapi/v1/users/cart",
            data: {
              listingId:listingId
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };
        /**
         * items.db.deleteAll
         * @returns {callback}
         */
        cartService.items.db.deleteAll = function() {
          return $http({
            method: "DELETE",
            url: baseUrl+"/rtapi/v1/users/cart/all",
            headers: {
              "Content-Type": "application/json"
            }
          });
        };
        /**
         * items.db.checkout
         * @returns {callback}
         */
        cartService.items.db.checkout = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/users/cart/checkout",
            data: cartService.items._items,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };


        /**
         * taxable
         */
        cartService.taxable = function(buyerState) {
	  console.log('cart.service');
          var items = cartService.items.get();
          var result = [];
          for (var i=0; i<items.length; i++) {
            var item = items[i];
            var price=(item.listingId.flatShippingRate+item.price)/100;
            if (item.sellerId.primaryAddress.state==buyerState) {
              result.push({ItemKey:item.listingId._id, ItemDescription:item.listingId.title, ActualExtendedPrice:price.toString(), Quantity:item.quantity.toString()});
            }
          }
          console.log('result', result);
          return result;
        };
	
        /**
         * seller
         * @param {string} sellerId
         * @returns {callback}
         */
        cartService.seller = function(sellerId) {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/cart/payment/"+sellerId
          });
        };

        /**
	 * add
	 * @param {string} listingId
	 * @param {number} quantity
	 */
	cartService.add = function (listingId, quantity) {
	  console.log('cartService.add', listingId, quantity);
	  return $http({
            method: "POST",
            data: {
              listingId:listingId,
              quantity:quantity
            },
            url: baseUrl+"/rtapi/v1/cart/",
            headers: {
              "Content-Type": "application/json"
            }
	  });
	};

        /**
         * fetch
         * @returns {}
         */
        cartService.fetch = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/cart/"
          });
        };

        /**
         * update
         * @param {string} cartId
         * @param {string} listingId
         * @param {number} quantity
         */
        cartService.update = function (cartId, quantity) {
          return $http({
            method: "PUT",
            data:{cartId:cartId, quantity:quantity},
            url: baseUrl+"/rtapi/v1/cart/"
          });
        };

        /**
         * remove
         * @param {string} listingId
         */
        cartService.remove = function (listingId) {
          return $http({
            method: "DELETE",
            data:{
              listingId:listingId
            },
            url: baseUrl+"/rtapi/v1/cart/"
          });
        };

        /**
         * checkout
         * @returns {callback}
         */
        cartService.checkout = function (model) {
          console.log(model);
          return $http({
            method: "POST",
            data:model,
            url: baseUrl+"/rtapi/v1/cart/checkout",
            headers: {
 	      "Content-Type": "application/json"
            }
          });
        };


        /**
         * cartService.items.set
         * @param {array} items
         */
        cartService.items.set = function(items) {
          cartService.items._items = angular.copy(items);
        };

        /**
         * cartService.items.get
         * @returns {array}
         */
        cartService.items.get = function() {
          return angular.copy(cartService.items._items);
        };

        /**
         * items.add
         * @param {string} listingId
         * @param {number} quantity
         */
        cartService.items.add = function(listingId, quantity) {
          cartService.items._items.push(item);
        };

        /**
         * items.delete
         * @param {string} listingId
         */
        cartService.items.delete = function(listingId) {
          var items = cartService.items._items;
          var length = items.length;
          for(var i=0;i<=length;i++) {
            if(items[i].listingId == listingId) {
              cartService.items._items.splice(i, 1);
            }
          }
        };

        /**
         * items.deleteAll
         */
        cartService.items.deleteAll = function() {
          cartService.items._items = [];
        };

        /**
         * items.incrementQuantity
         * @param {string} listingId
         */
        cartService.items.incrementQuantity = function(listingId) {
          var items = cartService.items._items;
          var length = items.length;
          for(var i=0;i<=length;i++) {
            if(items[i].id == listingId){
              // cartService.items._items[i].quantity++;
              console.log(cartService.items._items[i].quantity++);
            }
          }
        };

        /**
         * decrementQuantity
         * @param {string} listingId
         */
        cartService.items.decrementQuantity = function(listingId) {
          var items = cartService.items._items;
          var length = items.length;
          for(var i=0;i<=length;i++) {
            if(items[i].id == listingId){
              console.log(artService.items._items[i].quantity--);
            }
          }
        };

        /**
         * items.updateQuantity
         * @param {string} listingId
         * @param {number} quantity
         */
        cartService.items.updateQuantity = function(listingId, quantity) {
          var items = cartService.items._items;
          var length = items.length;
          for (var i=0; i<=length; i++) {
            if (items[i].id == listingId){
              cartService.items._items[i].quantity = quantity;
            }
          }
        };

        /**
         * items.checkout
         */
        cartService.items.checkout = function() {
          $log.log("checkout items");
        };

        /**
         * goToListing
         * @param {string} listingId
         * @returns {callback}
         */
        cartService.goToListing = function(listingId) {
          return $state.go("home.item", {id:listingId});
        };

        /**
         * goToPayment
         * @param {string} sellerId
         * @returns {callback}
         */
        cartService.goToPayment = function(sellerId) {
          return $state.go("home.cart.payment", {sellerId:sellerId});
        };

        /**
         * goToShipping
         * @param {string} sellerid
         * @returns {callback}
         */
        cartService.goToShipping = function(sellerId) {
          return $state.go("home.cart.shipping", {sellerId:sellerId});
        };


        /**
         * goToSuccess
         * @param {string} sellerId
         * @returns {callback}
         */
        cartService.goToSuccess = function(sellerId) {
          return $state.go("home.cart.success", {sellerId:sellerId});
        };

        /**
         * init
         */
        cartService.init = function() {
          console.log('cartService.init');
	  rtsocket.responders.cart = {
	    update:function(data) {
              console.log('rtsocket.responders.cart.update', data);
	    },
	    counter:function(data) {
	      var count = 0;
	      if (typeof(data.count.count)==="undefined") {
		count = data.count;
	      } else {
		count = data.count.count;
	      }
	      topService.refresh('cartCount', count);
	    }
	  };
	  
        };
        cartService.init();
        return cartService;
      }
    ]
  );
})(console, angular);
