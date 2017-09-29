/**
 * @fileOverview
 * @name seller.settings.service.js
 * @author
 * @license
 */

(function(angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'sellerSettingsService',
    [
      '$http',
      'baseurlService',
      function($http, baseurlService) {

        delete $http.defaults.headers.common['X-Requested-With'];
        var sellerSettingsService = {};
        var mySellerSettings = null;
        var myCarriers = null;
        var connectDetails = {};

        var baseUrl = baseurlService.address;

        /**
         * fetchSellerReturns
         * @returns {callback}
         */
        sellerSettingsService.fetchSellerReturns = function() {
          return $http({
            method: 'GET',
            url: '/users/returns'
          });
        };

        /**
         * updateSellerReturns
         * @param {object}
         * @returns {callback}
         */
        sellerSettingsService.updateSellerReturns = function(returns) {
          return $http({
            method: 'POST',
            url: baseUrl+'/rtapi/v1/users/returns',
            data: {
              returns: returns
            },
            headers: {
              'Content-Type': 'application/json'
            }
          });
        };

        sellerSettingsService.fetchSellerSettings = function() {
          return $http({
            method: 'POST',
            url: '/users/seller/settings',
            data: {},
            headers: {
              'Content-Type': 'application/json'
            }
          });
        };

        sellerSettingsService.fetchConnectDetails = function() {
          return $http({
            method: 'POST',
            url: '/users/seller/connectdetails',
            data: {},
            headers: {
              'Content-Type': 'application/json'
            }
          });
        };

        sellerSettingsService.listCarriers = function() {
          return $http({
            method: 'POST',
            url: '/users/seller/settings/carrier/list',
            data: {},
            headers: {
              'Content-Type': 'application/json'
            }
          });
        };

        sellerSettingsService.saveCarrier = function(carrier) {
          return $http({
            method: 'POST',
            url: '/users/seller/settings/carrier/save',
            data: {
              carrier: carrier
            },
            headers: {
              'Content-Type': 'application/json'
            }
          });
        };

        sellerSettingsService.setCarriers = function(carriers) {
          myCarriers = carriers;
        };

        sellerSettingsService.getCarriers = function() {
          return myCarriers;
        };

        sellerSettingsService.getSellerSettings = function() {
          return mySellerSettings;
        };

        sellerSettingsService.setConnectDetails = function(newConnectDetails) {
          connectDetails = newConnectDetails;
        };

        sellerSettingsService.getConnectDetails = function() {
          return connectDetails;
        };

        return sellerSettingsService;
      }
    ]
  );
})(angular);
