/**
 * @fileOverview
 * @name shipping.submit.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "shippingSubmitService",
    [
      '$window',
      'salesService',
      'addressService',
      'shippingService',
      function($window, salesService, addressService, shippingService) {
        var shippingSubmitService = {};

        shippingSubmitService.gateway = {};
        shippingSubmitService.gateway._gateway = {};

        /**
         * gateway.set
         * @param {object} gateway
         */
        shippingSubmitService.gateway.set = function(gateway) {
          shippingSubmitService.gateway._gateway = angular.copy(gateway);
        };

        /**
         * gateway.get
         * @returns {object}
         */
        shippingSubmitService.gateway.get = function() {
          return angular.copy(shippingSubmitService.gateway._gateway);
        };

        shippingSubmitService.model = {};
        shippingSubmitService.model._model = {};

        /**
         * model.set
         * @param {object} model
         */
        shippingSubmitService.model.set = function(model) {
          shippingSubmitService.model._model = angular.copy(model);
        };

        /**
         * model.get
         * @param {object} model
         * @returns {object}
         */
        shippingSubmitService.model.get = function(model) {
          return angular.copy(shippingSubmitService.model._model);
        };

        shippingSubmitService.address = {};
        shippingSubmitService.address._address = {};

        /**
         * address.set
         * @param {object} model
         */
        shippingSubmitService.address.set = function(model) {
          shippingSubmitService.address._address = angular.copy(model);
        };

        /**
         * address/get
         * @param {object} address
         * @returns {object}
         */
        shippingSubmitService.address.get = function(model) {
          return angular.copy(shippingSubmitService.address._address);
        };

        shippingSubmitService.sale = {};
        shippingSubmitService.sale.addresses = {};

        /**
         * sale.addresses.update
         * @returns {callback}
         */
        shippingSubmitService.sale.addresses.update = function(id, addresses) {
          console.log('shippingSubmitService.sale.addresses.update.id: ', id);
          return salesService.addresses.update(id, addresses);
        };

        /**
         * validate
         * @returns {callback}
         */
        shippingSubmitService.address.validate = function() {
          return addressService.address.validate(shippingSubmitService.address.get());
        };

        /**
         * save
         * @returns {callback}
         */
        shippingSubmitService.address.save = function() {
          var o = shippingSubmitService.address.get();
          if (o._id) {
            return addressService.address.update(o);
          } else {
            return addressService.address.create(o);
          }
        };

        shippingSubmitService.tracking = {};

        /**
         * tracking.save
         * @param {object} trackingNumber
         * @returns {callback}
         */
        shippingSubmitService.tracking.get = function(trackingNumber) {
          return shippingService.getTrackingStatus(trackingNumber);
        };

        /**
         * tracking.save
         * @param {object} trackingNumber
         * @returns {callback}
         */
        shippingSubmitService.tracking.save = function(trackingNumber) {
          return shippingService.saveTrackingNumber(trackingNumber);
        };

        /**
         * tracking.remove
         * @param {object} trackingNumber
         * @returns {callback}
         */
        shippingSubmitService.tracking.remove = function(trackingNumber) {
          return shippingService.removeTrackingNumber(trackingNumber);
        };

        shippingSubmitService.rates = {};

        /**
         * rates.get
         * @param {object} label
         * @param {object} sale
         * @returns {callback}
         */
        shippingSubmitService.rates.get = function(label, sale) {
          return shippingService.getRates(label, sale);
        };

        shippingSubmitService.shipment = {};

        shippingSubmitService.shipment._shipment = {};

        /**
         * shipment.set
         * @param {} model
         */
        shippingSubmitService.shipment.set = function(model) {
          shippingSubmitService.shipment._shipment = angular.copy(model);
        };

        /**
         * shipment.get
         * @returns {}
         */
        shippingSubmitService.shipment.get = function() {
          return angular.copy(shippingSubmitService.shipment._shipment);
        };

        shippingSubmitService.labels = {};

        /**
         * labels.add
         * @param {object} label
         */
        shippingSubmitService.labels.add = function(label) {
          shippingService.labels.add(label);
        };

        /**
         * labels.refund
         * @param {string} transactionId
         */
        shippingSubmitService.labels.refund = function(transactionId) {
          console.log('shipping.submit.service.label.refund: ', transactionId.shippo.transactionId);
          return shippingService.refundLabel(transactionId);
        };

        /**
         * showShippingLabel
         * @param {object} label
         * @returns {callback}
         */
        shippingSubmitService.showShippingLabel = function(label) {
          return $window.open(label.label_url, "_blank");
        };

        /**
         * showReturnLabel
         * @param {object} label
         * @returns {callback}
         */
        shippingSubmitService.showReturnLabel = function(label) {
          return $window.open(label.return_url, "_blank");
        };

        /**
         * goToSummary
         * @param {} id
         * @returns {}
         */
        shippingSubmitService.goToSummary = function(id) {
          return shippingService.goToSummary(id);
        };

        /**
         * goToSubmit
         * @param {} id
         * @returns {}
         */
        shippingSubmitService.goToSubmit = function(id) {
          return shippingService.goToSubmit(id);
        };

        /**
         * init
         */
        shippingSubmitService.init = function() {
          console.log('shipping.submit.service.init');
        };
        shippingSubmitService.init();

        return shippingSubmitService;
      }
    ]);
})(console, angular);
