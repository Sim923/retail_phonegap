/**
 * @fileOverview
 * @name profile.address.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "profileAddressService",
    [
      'addressService',
      function(addressService) {
        var profileAddressService = {};

        profileAddressService.model = {};
        profileAddressService.model._model = {};
        profileAddressService.edit = {};
        profileAddressService.edit.model = {};
        profileAddressService.edit.model._model = {};

        /**
         * model.set
         * @param {object} model
         */
        profileAddressService.model.set = function(model) {
          profileAddressService.model._model=angular.copy(model);
        };

        /**
         * model.get
         * @returns {object}
         */
        profileAddressService.model.get = function() {
          return angular.copy(profileAddressService.model._model);
        };

        /**
         * edit.model.set
         * @param {object} model
         */
        profileAddressService.edit.model.set = function(model) {
          profileAddressService.edit.model._model=angular.copy(model);
        };

        /**
         * edit.model.get
         * @returns {object}
         */
        profileAddressService.edit.model.get = function() {
          return angular.copy(profileAddressService.edit.model._model);
        };

        /**
         * validate
         * @returns {callback}
         */
        profileAddressService.validate = function() {
          return addressService.address.validate(profileAddressService.edit.model.get());
        };

        /**
         * delete
         * @returns {callback}
         */
        profileAddressService.delete = function() {
          var o = profileAddressService.model.get();
          if (o._id) {
            return addressService.address.delete(o);
          } else {
            console.log('Need an id in order to delete');
          }
        };

        /**
         * save
         * @returns {callback}
         */
        profileAddressService.save = function() {
          var o = profileAddressService.edit.model.get();
          if (o._id) {
            console.log('updating');
            return addressService.address.update(o);
          } else {
            return addressService.address.create(o);
          }
        };

        /**
         * list
         * @returns {callback}
         */
        profileAddressService.list = function() {
          return addressService.address.list();
        };

        /**
         * setPrimary
         * @param {string} id
         * @returns {callback}
         */
        profileAddressService.setPrimary = function(id) {
          return addressService.address.setPrimary(id);
        };

        return profileAddressService;
      }
    ]
  );
})(console, angular);
