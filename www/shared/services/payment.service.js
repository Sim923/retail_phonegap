/**
 * @fileOverview
 * @name payment.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "paymentService",
    [
      '$http',
      function($http) {
        var paymentService = {};

        return paymentService;
      }
    ]
  );
})(console, angular);
