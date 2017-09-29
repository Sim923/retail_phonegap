/**
 * @fileOverview
 * @name refund.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'refundsService',
    [
      '$http',
      'rtsocket',
      'baseurlService',
      function($http, rtsocket, baseurlService) {
        var refundsService = {};

        var baseUrl = baseurlService.address;

        /**
         * fetchRefundByid
         * @param {string} id
         * @returns {object}
         */
        refundsService.fetchRefundById = function(saleId) {
          return $http(
            {
              method : 'POST',
              url : baseUrl+'/rtapi/v1/refunds/getBySaleId',
              data : { saleId: saleId },
              headers : { 'Content-Type': 'application/json' }
            }
          );
        };

        /**
         * submitRefundRequest
         * @param {string} id
         * @param {string} reason
         * @returns {callback}
         */
        refundsService.submitRefundRequest = function( saleId, reason ) {
          return $http(
            {
              method : 'POST',
              url : baseUrl+'/rtapi/v1/refunds/submit',
              data : { saleId : saleId, reason : reason },
              headers : {'Content-Type': 'application/json'}
            }
          );
        };

        /**
         * sendComment
         * @param {string} id
         * @param {string} reason
         * @returns {object}
         */
        refundsService.sendComment = function( saleId, reason ) {
          return $http(
            {
              method : 'POST',
              url : baseUrl+'/rtapi/v1/refunds/send',
              data : { saleId : saleId, reason : reason },
              headers : {'Content-Type': 'application/json'}
            }
          );
        };

        /**
         * acceptRefund
         * @param {string} id
         * @returns {object} - promise
         */
        refundsService.acceptRefund = function(saleId, amount) {
          return $http(
            {
              method : 'POST',
              url : baseUrl+'/rtapi/v1/refunds/accept',
              data : { saleId : saleId, amount : amount},
              headers : {'Content-Type': 'application/json'}
            }
          );
        };

        /**
         * rejectRefund
         * @param {string} saleId
         * @returns {object} - promise
         */
        refundsService.rejectRefund = function(saleId) {
          return $http(
            {
              method : 'POST',
              url : baseUrl+'/rtapi/v1/refunds/reject',
              data : {saleId : saleId},
              headers : {'Content-Type': 'application/json'}
            }
          );
        };

        /**
         * user
         * @returns {callback} 
         */
        refundsService.user = function() {
          return $http(
            {
              method : 'GET',
              url : baseUrl+'/rtapi/v1/refunds/user',
              headers : {'Content-Type': 'application/json'}
            }
          );
        };

        refundsService.controller = {};
        refundsService.controller.callback = {};
        refundsService.controller.callback._callback = null;

        /**
         * controller.callback.set
         * @param {function} cb
         */
        refundsService.controller.callback.set = function(cb) {
          refundsService.controller.callback._callback=cb;
        };

        /**
         * controller.callback.exec
         * @param {object} data
         */
        refundsService.controller.callback.exec = function(data) {
          if (refundsService.controller.callback._callback) {
            refundsService.controller.callback._callback(data);
          }
        };

        /**
         * init
         */
        refundsService.init = function() {
          console.log('refunds.service.init');
          rtsocket.responders.refunds = {
            update:function(data) {
              console.log('update', data);
              refundsService.controller.callback.exec(data);
            }
          };
        };
        refundsService.init();

        return refundsService;
      }
    ]
  );
})(console, angular);
