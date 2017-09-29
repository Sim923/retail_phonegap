/**
 * @fileOverview
 * @name profile.sales.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "profileSalesService",
    [
      'salesService',
      function(salesService) {
        var profileSalesService = {};
        profileSalesService.model = {};
        profileSalesService.model._model = {};

        /**
         * model.set
         * @param {object} model
         */
        profileSalesService.model.set = function(model) {
          profileSalesService.model._model=angular.copy(model);
        };

        /**
         * model.get
         * @returns {object} 
         */
        profileSalesService.model.get = function() {
          return angular.copy(profileSalesService.model._model);
        };

        /**
         * goToFeedback
         * @param {string} id
         * @returns {callback} 
         */
        profileSalesService.goToFeedback = function(id) {
          return salesService.goToFeedback(id);
        };

        /**
         * goToShipping
         * @param {string} id
         * @returns {callback} 
         */
        profileSalesService.goToShipping = function(id) {
          return salesService.goToShipping(id);
        };

        /**
         * init
         */
        profileSalesService.init = function() {
          console.log('profile.sales.service.init');
        };

        profileSalesService.init();

        return profileSalesService;
      }
    ]
  );
})(console, angular);