/**
 * @fileOverview
 * @name cart.shipping.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "cartShippingService",
    [
      '$location',
      'rtsocket',
      'addressService',
      'cartService',
      function($location, rtsocket, addressService, cartService) {
        var cartShippingService = {};

        cartShippingService.model = {};
        cartShippingService.model._model = {};

        /**
         * goToPayment
         * @param {string} sellerId
         * @returns {callback}
         */
        cartShippingService.goToPayment = function(sellerId) {
          return cartService.goToPayment(sellerId);
        };

        /**
         * model.set
         * @param {object} model
         */
        cartShippingService.model.set = function(model) {
          cartShippingService.model._model = angular.copy(model);
        };

        /**
         * model.get
         * @param {object} model
         * @returns {object}
         */
        cartShippingService.model.get = function(model) {
	  var m = angular.copy(cartShippingService.model._model);
          return m;
        };

        /**
         * model.reset
         * @param {object} model
         */
        cartShippingService.model.reset = function() {
          cartShippingService.model._model = {
            contact: '',
            line1: '',
            line2: '',
            city: '',
            zipCode: '',
            phone: '',
            email: ''
          };
        };

        /**
         * validate
         */
        cartShippingService.validate = function() {
          return addressService.address.validate(cartShippingService.model.get());
        };

        /**
         * save
         */
        cartShippingService.save = function() {
          var o = cartShippingService.model.get();
          if (o._id) {
            return addressService.address.update(o);
          } else {
            return addressService.address.create(o);
          }
        };

        /**
         * list
         * @returns {callback}
         */
        cartShippingService.list = function() {
          return addressService.address.list();
        };

        return cartShippingService;
      }
    ]
  );
})(console, angular);
