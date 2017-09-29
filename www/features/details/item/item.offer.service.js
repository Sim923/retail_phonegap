/**
 * @fileOverview
 * @name offer.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(conosole, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "offerService",
    [
      '$http',
      'rtsocket',
      'userService',
      'cartService',
      'baseurlService',
      function OfferService($http, rtsocket, userService, cartService, baseurlService) {

        var offerService = {};

        offerService.id = {};
        offerService.id._id = {};

        var baseUrl = baseurlService.address;

        /**
         * is.set
         * @param {string} id
         */
        offerService.id.set = function(id) {
          offerService.id._id=id;
        };

        /**
         * id.get
         * @returns {string}
         */
        offerService.id.get = function() {
          return offerService.id._id;
        };

        offerService.offers = {};

        /**
         * offers.set
         * @param {object} offer
         */
        offerService.offers.set = function(offer) {
          _offer = offer;
        };

        /**
         * offers.get
         * @returns {object}
         */
        offerService.offers.get = function() {
          return _offer;
        };

        /**
         * offers.offer
         * @param {object} offer
         * @returns {callback}
         */
        offerService.offers.offer = function(offer) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/offers/add",
            data: {
              offer: offer
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * offers.counter
         * @param {object} offer
         * @returns {callback}
         */
        offerService.offers.counter = function(offer) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/offers/counter",
            data: {
              offer: offer
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * offers.accept
         * @param {object} offer
         * @returns {callback}
         */
        offerService.offers.accept = function(offer) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/offers/accept",
            data: {
              offer: offer
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * offers.reject
         * @param {object} offer
         * @returns {callback}
         */
        offerService.offers.reject = function(offer) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/offers/reject",
            data: {
              offer: offer
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * offers.more
         * @param {string} listingId
         * @param {string} offerId
         * @returns {callback}
         */
        offerService.offers.more = function(listingId, offerId) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/offers/more",
            data: {
              offerId: offerId,
              listingId: listingId
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        offerService.controller = {};
        offerService.controller.callback = {};
        offerService.controller.callback._callback = null;

        /**
         * controller.callback.set
         * @param {function} cb
         */
        offerService.controller.callback.set = function(cb) {
          offerService.controller.callback._callback=cb;
        };

        /**
         * controller.callback.exec
         * @param {object} data
         */
        offerService.controller.callback.exec = function(data) {
          if (offerService.controller.callback._callback) {
            offerService.controller.callback._callback(data);
          }
        };

        /**
         * init
         */
        offerService.init = function() {
          console.log("offerService.init");
          rtsocket.responders.offer = {
            update:function(data) {
              console.log('rtsocket.responders.offer.update', data);
              offerService.controller.callback.exec(data);
            }
          };
        };
        offerService.init();

        return offerService;
      }
    ]
  );
})(console, angular);
