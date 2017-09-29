/**
 * @fileOverview
 * @name addresses.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'addressesService',
    [
      '$http',
      'baseurlService',
      function($http, baseurlService) {
        var addressesService = {};
        addressesService.address = {};

        addressesService.model = {};
        addressesService.model._model = {};

        var baseUrl = baseurlService.address;

        /**
         * model.set
         * @param {object} model
         */
        addressesService.model.set = function(model) {
          addressesService.model._model = angular.copy(model);
        };

        /**
         * model.get
         * @param {object} model
         * @returns {object} 
         */
        addressesService.model.get = function(model) {
          return angular.copy(addressesService.model._model);
        };

        /**
         * address.validate
         * @param {object} model
         * @returns {callback} 
         */
        addressesService.address.validate = function(model) {
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
        addressesService.address.create = function(model) {
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
        addressesService.address.update = function(model) {
          return $http({
            method: "PUT",
            data:model,
            url: baseUrl+"/rtapi/v1/addresses/"
          });        
        };

        /**
         * address.delete
         * @param {object} model
         * @returns {callback} 
         */
        addressesService.address.delete = function(model) {
          return $http({
            method: "DELETE",
            data:model,
            url: baseUrl+"/rtapi/v1/addresses/"
          });        
        };

        /**
         * address.primary
         */
        addressesService.address.primary = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/addresses/primary"
          });        
        };

        /**
         * address.list
         * @returns {callback} 
         */
        addressesService.address.list = function() {
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
        addressesService.address.setPrimary = function(id) {
          return $http({
            method: "POST",
            data:{addressId:id},
            url: baseUrl+"/rtapi/v1/addresses/primary"
          });        
        };

        /**
         * init
         */
        addressesService.init = function() {
          console.log('addressesService.init');
        };

        addressesService.init();

        return addressesService;
      }
    ]
  );
})(console, angular);
