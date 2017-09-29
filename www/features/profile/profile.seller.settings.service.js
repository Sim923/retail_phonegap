/**
 * @fileOverview
 * @name profile.sellersettings.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "profileSellerSettingsService",
    [
      'userService',
      'sellerSettingsService',
      'paymentGatewayService',
      function(userService, sellerSettingsService, paymentGatewayService) {
        var profileSellerSettingsService = {};
        profileSellerSettingsService.model = {};
        profileSellerSettingsService.model._model = {};
        profileSellerSettingsService.model._model.funding = {};
        profileSellerSettingsService.model._model.funding.routingNumber = '';
        profileSellerSettingsService.model._model.funding.accountNumberLast4 = '';
        profileSellerSettingsService.model._model.funding.status = '';
        profileSellerSettingsService.model._model.funding.emailAddress = '';
        profileSellerSettingsService.model._model.funding.mobileNumber = '';
        profileSellerSettingsService.model._model.funding.type = '';


        /**
         * model.get
         * @returns {object}
         */
        profileSellerSettingsService.model.get = function() {
          return angular.copy(profileSellerSettingsService.model._model);
        };

        /**
         * model.set
         * @param {object} model
         */
        profileSellerSettingsService.model.set = function(model) {
          profileSellerSettingsService.model._model = angular.copy(model);
        };

        profileSellerSettingsService.returns = {};

        /**
         * returns.save
         * @returns {callback}
         */
        profileSellerSettingsService.returns.save = function() {
          var o = profileSellerSettingsService.model.get();
          return sellerSettingsService.updateSellerReturns(o.returns);
        };

        profileSellerSettingsService.funding = {};

        /**
         * funding.save
         * @returns {callback}
         */
        profileSellerSettingsService.funding.save = function() {
          var o = profileSellerSettingsService.model.get();
          console.log('profileSellerSettingsService.funding.save.o: ', o);
          return paymentGatewayService.accounts.create(o.funding);
        };

        profileSellerSettingsService.taxify = {};

        /**
         * taxify.save
         * @returns {callback} 
         */
        profileSellerSettingsService.taxify.save = function() {
          var o = profileSellerSettingsService.model.get();
          return userService.taxify.save(o.taxify);
        };

        return profileSellerSettingsService;
      }
    ]
  );
})(console, angular);
