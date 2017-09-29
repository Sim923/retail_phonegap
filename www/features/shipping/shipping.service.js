/**
 * @fileOverview
 * @name shipping.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "shippingService",
    [
      '$http',
      '$location',
      'userService',
      'baseurlService',
      function($http, $location, userService, baseurlService) {

        var shippingService = {};

        var baseUrl = baseurlService.address;

        shippingService.labels = {};
        shippingService.labels._labels = [];

        /**
         * labels.add
         * @param {object} label
         */
        shippingService.labels.add = function(label) {
          shippingService.labels._labels.push(label);
        };

        /**
         * labels.get
         * @returns {array}
         */
        shippingService.labels.get = function() {
          return angular.copy(shippingService.labels._labels);
        };

        /**
         * labels.reset
         */
        shippingService.labels.reset = function() {
          console.log("shipping.service.labels.reset");
          shippingService.labels._labels=[];
        };

        /**
         * pay
         * @param {object} data
         * @returns {object} http promise
         */
        shippingService.pay = function(data) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/shipping/buy",
            data: data,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * refundLabel
         * @param {string} transactionId
         * @returns {object} http promise
         */
        shippingService.refundLabel = function(transactionId) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/shipping/carrier/label/refund",
            data: {
              transactionId: transactionId
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * goToSubmit
         * @param {string} id
         * @returns {object}
         */
        shippingService.goToSubmit = function(id) {
          return $location.path("/shipping/" + id);
        };

        /**
         * goToSummary
         * @param {string} id
         * @returns {object}
         */
        shippingService.goToSummary = function(id) {
          return $location.path("/shipping/summary/" + id);
        };

        /**
         * goToShipping
         * @param {string} id
         * @returns {callback}
         */
        shippingService.goToShipping = function(id) {
          return $location.path("/shipping/" + id);
        };

        /**
         * saveTrackingNumber
         * @param {string} trackingNumber
         * @returns {object} http promise
         */
        shippingService.saveTrackingNumber = function(trackingNumber) {
          console.log('shippingService.saveTrackingNumber: ', trackingNumber);
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/shipping/tracking/save",
            data: {
              trackingNumber: trackingNumber
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * getTrackingStatus
         * @param {string} trackingNumber
         * @returns {object} http promise
         */
        shippingService.getTrackingStatus = function(trackingNumber) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/shipping/tracking/status",
            data: {
              trackingNumber: trackingNumber
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * removeTrackingNumber
         * @param {string} trackingNumber
         * @returns {object} http promise
         */
        shippingService.removeTrackingNumber = function(trackingNumber) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/shipping/tracking/remove",
            data: {
              trackingNumber: trackingNumber
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * getRates
         * @param {string} label
         * @param {object} sale
         * @returns {object}
         */
        shippingService.getRates = function(label, sale) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/shipping/carrier/rates",
            data: {
              label: label,
              sale: sale
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * removeShippingLabel
         * @param {string} id
         * @param {string} trackingNumber
         * @returns {object} http promise
         */
        shippingService.removeShippingLabel = function(id, trackingNumber) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/shipping/carrier/label/remove",
            data: {
              trackingNumber: trackingNumber,
              id: id
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * parcels
         * @returns {callback}
         */
        shippingService.parcels = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/resources/parcels",
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * saveShippingLabel
         * @param {string} parcel
         * @param {object} sale
         * @param {string} carrier
         * @returns {object} http promise
         */
        shippingService.saveShippingLabel = function(parcel, sale, carrier) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/shipping/carrier/label/save",
            data: {
              parcel: parcel,
              sale: sale,
              carrier: carrier
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        shippingService.init = function() {
          console.log('shipping.service.init');
        };
        shippingService.init();

        return shippingService;
      }
    ]
  );
})(console, angular);
