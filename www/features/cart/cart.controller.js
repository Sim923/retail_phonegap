/*
 * @fileOverview cart view controller
 * @name cart.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'cart.controller',
    [
      '$log',
      '$state',
      'cart',
      'cartService',
      'navService',
      '$timeout',
      function($log, $state, cart, cartService, navService, $timeout) {
        console.log(cart);

        var cc = {};
        cc.items = cartService.items.get();
        //console.log(JSON.stringify(JSON.stringify(cc.items)));
        var _isAdding = false;

        cc.subTotal = function(values){
          console.log(JSON.stringify(values));
          var subtotal = 0.0;
           for (var i=0; i< values.length; i++) {
            var item = values[i];
            subtotal += parseFloat(item.price*item.quantity)/100;
            subtotal += parseFloat(item.listingId.flatShippingRate*item.quantity*0.01);
            console.log(JSON.stringify(subtotal));
          }

          return '$'+subtotal;
        }

        /**
         * update
         */
        cc.update = function() {
          cc.items = cartService.items.get();
        };

        /**
         * stepper
         * @param {string} cartId
         * @param {number} quantity
         */
        cc.stepper = function(cartId, quantity) {
          cartService.update(cartId, quantity).then(
            function(resp) {
            },
            function(resp) {
            }
          );
        };

        /**
         * add
         * @param {string} listingId
         * @param {number} quantity
         */
        cc.add = function(listingId, quantity) {
          if (_isAdding===false) {
            _isAdding=true;
            cartService.items.db.add(listingId, quantity).then(
              function() {
                _isAdding=false;
                cartService.items.add(listingId, quantity);
                cc.update();
              },
              function(resp) {
                _isAdding=false;
              }
            );
          }
        };

        /**
         * delete
         * @param {string} listingId
         * @param {number} quantity
         */
        cc.delete = function(listingId, quantity) {
          cartService.items.db.delete(
            listingId, quantity
          ).then(function() {
            cartService.items.delete(listingId, quantity);
            cc.update();
          });
        };

        /**
         * remove
         * @param {string} id
         */
        cc.remove = function(seller, listingId) {
          cartService.remove(listingId).then(
            function(resp) {
              var id = resp.data._id;
              for (var i=0; i < cc.items[seller].length; i++) {
                if (cc.items[seller][i]._id==id) {
                  cc.items[seller].splice(i, 1);
                  break;
                }
              }
              if (cc.items[seller].length===0) {
                delete cc.items[seller];
                navService.refresh('cartCount', Object.keys(cc.items).length);
                navService.setCartCount(Object.keys(cc.items).length);
              }
            },
            function(resp) {
            }
          );
        };

        /**
         * deleteAll
         * @param {string} listingId
         * @param {number} quantity
         */
        cc.deleteAll = function(listingId, quantity) {
          cartService.items.db.deleteAll(
            listingId, quantity
          ).then(function() {
            cartService.items.deleteAll(listingId, quantity);
            cc.update();
          });
        };

        /**
         * incrementQuantity
         * @param {string} listingId
         */
        cc.incrementQuantity = function(listingId) {
          console.log('incremented');
          cartService.items.incrementQuantity(listingId);
        };

        /**
         * decrementQuantity
         * @param {string} listingId
         */
        cc.decrementQuantity = function(listingId) {
          console.log('decremented');
          cartService.items.decrementQuantity(listingId);
        };

        /**
         * updateQuantity
         * @param {string} listingId
         * @param {number} quantity
         */
        cc.updateQuantity = function(listingId, quantity) {
          cartService.items.updateQuantity(listingId, quantity);
        };

        /**
         * total
         * @returns {number}
         */
        cc.total = function() {
          var total = 0.0;
          for (var i=0; i<cartService.items._items.length; i++) {
            var item = cartService.items._items[i];
            total += item.price*item.amount;
          }
          total = total / 100;
          return total;
        };

        /**
         * checkout
         * @param {} checkoutList
         */
        cc.checkout = function(checkoutList) {
          cartService.items.checkout(checkoutList);
          cc.update();
          $state.go("home.cart.payment");
        };

        /**
         * goToShipping
         * @param {string} seller
         * @returns {callback}
         */
        cc.goToShipping = function(seller) {
          console.log("---------"+seller,cc.items[seller], cc.items[seller][0].sellerId);
          var id = cc.items[seller][0].sellerId._id;
          return cartService.seller(id).then(
            function(resp) {
	      cartService.items.set(resp.data);
              return cartService.goToShipping(id);
            },
            function(resp) {
              return {status:false, data:resp.data};
            }
          );
        };

        /**
         * price
         * @param {object} item
         * @returns {number}
         */
        cc.price = function(item) {
          return (parseFloat(item.price)/100)*item.amount;
        };

        /**
         * init
         */
        cc.init = function() {
          $log.log('cart.controller.init');
        };

        /**
         * empty
         * @returns {boolean}
         */
        cc.empty = function() {
          return Object.keys(cc.items).length===0;
        };

        cc.init();

        angular.extend(this, {
          cart:cc
        });
      }
    ]
  );
})(console, angular);
