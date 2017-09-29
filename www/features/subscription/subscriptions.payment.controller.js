/**
 * @fileOverview
 * @name subscriptions.payment.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'subscriptions.payment.controller',
    [
      '$state',
      'account',
      'subscriptions',
      'paymentGatewayService',
      'subscriptionsSignupService',
      'subscriptionsPaymentService',
      'subscriptionService',
      function($state, account, subscriptions, paymentGatewayService, subscriptionsSignupService, subscriptionsPaymentService, subscriptionService) {
        var model = {};
        model.plan = subscriptionService.plan.get();
        console.log(model.plan);

        /**
         * purchase
         */
        var purchase = function() {
          paymentGatewayService.tokens._hostedFieldsInstance.braintree.tokenize(
            function (tokenizeErr, payload) {
              if (tokenizeErr) {
                switch (tokenizeErr.code) {
                  case 'HOSTED_FIELDS_FIELDS_EMPTY':
                  console.error('All fields are empty! Please fill out the form.');
                  break;
                  case 'HOSTED_FIELDS_FIELDS_INVALID':
                  console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);
                  break;
                  case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
                  console.error('Tokenization failed server side. Is the card valid?');
                  break;
                  case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
                  console.error('Network error occurred when tokenizing.');
                  break;
                  default:
                  console.error('Something bad happened!', tokenizeErr);
                }
              } else {
                console.log('Got nonce:', payload.nonce);
                var planId = subscriptionService.plan.get().name;
                var name = planId.charAt(0).toUpperCase() + planId.substr(1).toLowerCase();
                var subscriptionId = subscriptionService.plan.get()._id;

                var s = {
                  planId:planId,
                  name:name,
                  subscriptionId:subscriptionId,
                  token:payload.nonce
                };
                subscriptionsPaymentService.model.set(s);
                var method = 'subscribe';
                if (account.data.paymentGateways.braintree.subscriptionId) {
                  method='upgrade';
                }
                subscriptionsPaymentService[method]().then(
                  function(resp) {
                    console.log('success', resp);
                    $state.go("profile.subscription.success");
                  },
                  function(resp) {
                    console.log('fail', resp);
                  }
                );
              }
            }
          );
        };

        /**
         * init
         */
        var init = function() {
          console.log('subscriptions.payment.controller.init');
          var styles = {
            'input': {
	      'color': '#555',
	      'font-family': 'Georgia, serif',
	      'font-size': '14px',
	      'font-weight': 'normal',
	      'line-height': '1.42857143',
	      '-webkit-transition': 'border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s',
	      'transition': 'border-color ease-in-out .15s, box-shadow ease-in-out .15s'
            },
            ':focus': { },
            '.valid': { 
	      'color': '#5cb85c'
            }
          };
          var fields = {
            number: {
              selector: '#card_number',
              placeholder: '4111 1111 1111 1111'
            },
            cvv: {
              selector: '#cvv',
              placeholder: '123'
            },
            expirationDate: {
              selector: '#expiration_date',
              placeholder: 'MM/YYYY'
            },
            postalCode: {
              selector: '#postal_code',
              placeholder: '11111'
            }
          };
          paymentGatewayService.createHostedFields(styles, fields);
        };

        init();

        angular.extend(
          this,
          {
            model:model,
            purchase:purchase
          }
        );
      }
    ]
  );
})(console, angular);