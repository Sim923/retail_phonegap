/**
 * @fileOverview
 * @name shipping.summary.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "shippingSummaryService",
    [
      'salesService',
      'addressService',
      'shippingService',
      function(salesService, addressService, shippingService) {
        var shippingSummaryService = {};

        /**
         * pay
         * @param {object} o
         */
        shippingSummaryService.pay = function(o) {
          return shippingService.pay(o);
        };

        shippingSummaryService.labels = {};

        /**
         * labels.save
         * @param {object} label
         * @param {object} sale
         * @param {object} carrier
         * @returns {callback}
         */
        shippingSummaryService.labels.save = function(label, sale, carrier) {
          return shippingService.saveShippingLabel(label, sale, carrier);
        };


        /**
         * labels.reset
         */
        shippingSummaryService.labels.reset = function() {
          console.log('shipping.summar.service.labels.reset');
          shippingService.labels.reset();
        };

        shippingSummaryService.model = {};
        shippingSummaryService.model._model = {};

        /**
         * model.set
         * @param {object} model
         */
        shippingSummaryService.model.set = function(model) {
          shippingSummaryService.model._model = angular.copy(model);
        };

        /**
         * model.get
         * @param {object} model
         * @returns {object}
         */
        shippingSummaryService.model.get = function(model) {
          return angular.copy(shippingSummaryService.model._model);
        };

        shippingSummaryService.address = {};
        shippingSummaryService.address._address = {};

        /**
         * address.set
         * @param {object} model
         */
        shippingSummaryService.address.set = function(model) {
          shippingSummaryService.address._address = angular.copy(model);
        };

        /**
         * address/get
         * @param {object} address
         * @returns {object}
         */
        shippingSummaryService.address.get = function(model) {
          return angular.copy(shippingSummaryService.address._address);
        };

        shippingSummaryService.sale = {};
        shippingSummaryService.sale.addresses = {};

        /**
         * sale.addresses.update
         * @returns {callback}
         */
        shippingSummaryService.sale.addresses.update = function(id, addresses) {
          return salesService.addresses.update(id, addresses);
        };

        /**
         * validate
         * @returns {callback}
         */
        shippingSummaryService.address.validate = function() {
          return addressService.address.validate(shippingSummaryService.address.get());
        };

        /**
         * save
         * @returns {callback}
         */
        shippingSummaryService.address.save = function() {
          var o = shippingSummaryService.address.get();
          if (o._id) {
            return addressService.address.update(o);
          } else {
            return addressService.address.create(o);
          }
        };

        /**
         * init
         */
        shippingSummaryService.init = function() {
          console.log('shipping.summary.service.init');
        };
        shippingSummaryService.init();

        return shippingSummaryService;
      }
    ]);
})(console, angular);
