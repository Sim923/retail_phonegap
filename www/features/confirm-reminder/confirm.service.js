/**
 * @fileOverview Payment controller
 * @name payment.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "confirmService",
    function($http, baseurlService) {
      var confirmService = {};

      var baseUrl = baseurlService.address;
      /**
       * checkHash
       * @param {string} hash
       * @returns {callback}
       */
      confirmService.checkHash = function(hash) {
        return $http(
          {
            method: "POST",
            url: baseUrl+"/rtapi/v1/users/check/hash",
            data: {
              hash: hash
            },
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      };

      /**
       * confirm
       * @param {string} email
       * @returns {callback}
       */
      confirmService.confirm = function(email) {
        return $http(
          {
            method: "POST",
            url: baseUrl+"/rtapi/v1/users/confirm/resend",
            data: {
              email:email
            },
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      };

      confirmService.init = function() {};
      return confirmService;
    }
  );
})(angular);
