/**
 * @fileOverview
 * @name cart.payment.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "cartPaymentService",
    [
      '$stateParams',
      'cartService',
      function($stateParams, cartService) {
        var cartPaymentService = {};

        cartPaymentService.model = {};
        cartPaymentService.model._model = {};

        /**
         * model.set
         * @param {object} model
         */
        cartPaymentService.model.set = function(model) {
          cartPaymentService.model._model = angular.copy(model);
        };

        /**
         * model.get
         * @param {object} model
         * @returns {object}
         */
        cartPaymentService.model.get = function(model) {
          return angular.copy(cartPaymentService.model._model);
        };

        /**
         * checkout
         * @returns {callback}
         */
        cartPaymentService.checkout = function(model) {
          return cartService.checkout(model);
        };

        /**
         * goToShipping
         * @param {string} sellerId
         * @returns {callback}
         */
        cartPaymentService.goToSuccess = function() {
          var id=$stateParams.sellerId;
          console.log('sellerId:', id);
          return cartService.goToSuccess(id);
        };

        /**
         * save
         * @returns {callback}
         */
        cartPaymentService.save = function() {
          var o = cartPaymentService.model.get();
          if (o._id) {
            return addressesService.address.update(o);
          } else {
            return addressesService.address.create(o);
          }
        };

        /**
         * validate
         * @returns {callback}
         */
        cartPaymentService.validate = function() {
          return addressesService.address.validate(cartPaymentService.model.get());
        };

        /**
         * init
         */
        cartPaymentService.init = function() {
          console.log('cart.payment.service.init');
        };

        cartPaymentService.init();

        return cartPaymentService;
      }
    ]
  );
})(console, angular);
