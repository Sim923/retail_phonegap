/**
 * @fileOverview Main AngularJS Application Services for Reeltrail application
 * @name app.services.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function () {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'addressService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http, baseurlService) {
        var addressService = {};
        addressService.address = {};
        addressService.address._address = {};

        addressService.model = {};
        addressService.model._model = {};

        var baseUrl = baseurlService.address;

        var fields = ['contact', 'line1', 'line2', 'city', 'state', 'zipCode', 'phone', 'email', 'shippoId'];

        /**
         * model.set
         * @param {object} model
         */
        addressService.model.set = function(model) {
          addressService.model._model = angular.copy(model);
        };

        /**
         * model.get
         * @param {object} model
         * @returns {object}
         */
        addressService.model.get = function(model) {
          return angular.copy(addressService.model._model);
        };

        /**
         * address.set
         * @param {address} address
         */
        addressService.address.set = function(address) {
          for (var i=0; i<fields.length; i++) {
            var key = fields[i];
            if (key in address) {
              addressService.address._address[key] = address[key];
            }
          }
        };
        /**
         * address.validate
         * @param {object} model
         * @returns {callback}
         */
        addressService.address.validate = function(model) {
          console.log("address -service ---- "+JSON.stringify(model));
          return $http({
            method: "POST",
            data:model,
            url: baseUrl+"/rtapi/v1/addresses/validate"
          });
        };

        /**
         * address.save
         * @param {object} model
         * @returns {callback}
         */
        addressService.address.create = function(model) {
          return $http({
            method: "POST",
            data:model,
            url: baseUrl+"/rtapi/v1/addresses/save"
          });
        };

        /**
         * address.update
         * @param {object} model
         * @returns {callback}
         */
        addressService.address.update = function(model) {
          return $http({
            method: "PUT",
            data:model,
            url: baseUrl+"/rtapi/v1/addresses"
          });
        };

        /**
         * address.delete
         * @param {object} model
         * @returns {callback}
         */
        addressService.address.delete = function(model) {
          return $http({
            method: "DELETE",
            data:model,
            url: baseUrl+"/rtapi/v1/addresses"
          });
        };

        /**
         * address.primary
         */
        addressService.address.primary = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/addresses/primary"
          });
        };

        /**
         * address.list
         * @returns {callback}
         */
        addressService.address.list = function() {
          return $http({
            method: "POST",
            data:{},
            url: baseUrl+"/rtapi/v1/addresses/list"
          });
        };

        /**
         * address.setPrimary
         * @param {string} id
         * @returns {callback}
         */
        addressService.address.setPrimary = function(id) {
          return $http({
            method: "POST",
            data:{addressId:id},
            url: baseUrl+"/rtapi/v1/addresses/primary"
          });
        };

        /**
         * init
         */
        addressService.init = function() {
          console.log('addressService.init');
        };

        addressService.init();

        return addressService;

      }
    ]
  );
})();
