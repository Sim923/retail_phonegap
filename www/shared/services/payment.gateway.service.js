/**
 * @fileOverview AngularJS service for handling multiple payment gateways in Reeltrail
 * @name payment.gateway.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular, braintree) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'paymentGatewayService',
    [
      '$http',
      'baseurlService',
      function($http, baseurlService) {
        var paymentGatewayService = {};

        var baseUrl = baseurlService.address;

        paymentGatewayService.clients = {};
        paymentGatewayService.clients._clients = {};

        paymentGatewayService.tokens = {};
        paymentGatewayService.tokens._tokens = {};
        paymentGatewayService.tokens._hostedFieldsInstance = {};
        console.log('client braintree: ', paymentGatewayService.clients._clients.braintree);
        /**
         * createHostedFields
         * @param {object} styles
         * @param {object} fields
         */
        paymentGatewayService.createHostedFields = function(styles, fields) {
          braintree.hostedFields.create(
            {
              client: paymentGatewayService.clients._clients.braintree,
              styles: styles,
              fields: fields
            },
            function (err, hostedFieldsInstance) {
              if (err) {
                console.log('err', err);
              } else {
                console.log('hostedFieldsInstance', hostedFieldsInstance);

                paymentGatewayService.tokens._hostedFieldsInstance.braintree = hostedFieldsInstance;
                hostedFieldsInstance.on('focus', function (event) {
                  console.log(event.emittedBy, 'has been focused');
                });
                hostedFieldsInstance.on('blur', function (event) {
                  console.log(event.emittedBy, 'has been blurred');
                });
                hostedFieldsInstance.on('empty', function (event) {
                  console.log(event.emittedBy, 'has been emptied');
                });
                hostedFieldsInstance.on('notEmpty', function (event) {
                  console.log(event.emittedBy, 'is not empty');
                });
                hostedFieldsInstance.on('cardTypeChange', function (event) {
                  console.log(event.emittedBy, ' card type changed');
                });
                hostedFieldsInstance.on('validityChange', function (event) {
                  console.log(event);
                  console.log(event.emittedBy, ' validity changed');
                });

              }
            }
          );
        };

        paymentGatewayService.accounts = {};

        /**
         * accounts.create
         * @param {object} model
         * @returns {callback}
         */
        paymentGatewayService.accounts.create = function(model) {
          return $http({
            method: "POST",
            data:model,
            url: baseUrl+"/rtapi/v1/accounts/"
          });
        };

        /**
         * accounts.update
         * @param {object} model
         * @returns {callback}
         */
        paymentGatewayService.accounts.update = function(model) {
          return $http({
            method: "PUT",
            data:model,
            url: baseUrl+"/rtapi/v1/accounts/"
          });
        };

        /**
         * accounts.get
         * @returns {callback}
         */
        paymentGatewayService.accounts.get = function(id) {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/accounts/"+id
          });
        };

        /**
         * tokens.get
         * @returns {callback}
         */
        paymentGatewayService.tokens.get = function() {
          var config = {
            method:"GET",
            url:baseUrl+"/rtapi/v1/tokens/all"
          };
          return $http(config);
        };

        /**
         * init
         */
        paymentGatewayService.init = function() {
          paymentGatewayService.tokens.get().then(
            function(resp) {
              console.log(resp.data.clientToken);
              paymentGatewayService.tokens._tokens.braintree = resp.data.clientToken;
              braintree.client.create(
                {
                  authorization:resp.data.clientToken
                },
                function (clientErr, clientInstance) {
                  if (clientErr) {
                    console.log(clientErr);
                    return;
                  }
                  paymentGatewayService.clients._clients.braintree = clientInstance;
                }
              );
            },
            function(resp) {
              console.log('There was an error getting the client token.');
            }
          );
        };

        return paymentGatewayService;
      }
    ]
  );
})(console, angular, braintree);
