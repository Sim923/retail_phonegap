/**
 * @fileOverview item view controller
 * @name item.options.payment.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'item.options.payment.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'itemService',
      'categories',
      'options',
      'optionsPrices',
      'paymentGatewayService',
      'itemOptionsPaymentService',
      function($log, $state, $timeout, itemService, categories, options, optionsPrices, paymentGatewayService, itemOptionsPaymentService) {

        var model = itemService.model.get();
        var oOptions = options.data;
        var prices = {};
        var subTotal = 0;
        var total = 0;
        var taxes = 0;
	
        var $this=this;
	
        /**
         * pay
         */
        var pay = function() {
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
                var listing = itemService.model.get();

                var s = {
                  total:calcTotal(),
                  listingId:itemService.id.get(),
                  options:model.options,
                  token:payload.nonce
                };
                console.log('s payload: ', s);
                itemOptionsPaymentService.model.set(s);
                var method = 'pay';
                itemOptionsPaymentService[method]().then(
                  function(resp) {
                    console.log('success', resp);
                    itemService.afterSave();
                  },
                  function(resp) {
                    console.log('fail', resp);
                    alertService.setAlertText(resp.data.message, "danger");
                  }
                );
              }
            }
          );
        };

        /**
         * processingFee
         * @returns {number} 
         */
        var processingFee = function() {
          var total = 0.0;
          total += (oOptions.options.showcase.isActive===false && model.options.showcase) ? parseFloat(prices.showcase) : 0;
          total += (oOptions.options.boldface.isActive===false && model.options.boldface) ? parseFloat(prices.boldface) : 0;
          total += (oOptions.options.viewCounter.isActive===false && model.options.viewCounter) ? parseFloat(prices.viewCounter) : 0;
          total += (oOptions.options.highlight.isActive===false && model.options.highlight) ? parseFloat(prices.highlight) : 0;
          var processingFee = (total * 0.0299 + 0.45);
          return processingFee.toFixed(2);
        };

        /**
         * calcTotal
         * @returns {number}
         */
        var calcTotal = function() {
          var total = 0.0;
	  console.log(oOptions);
          total += (oOptions.options.showcase.isActive===false && model.options.showcase) ? parseFloat(prices.showcase) : 0;
          total += (oOptions.options.boldface.isActive===false && model.options.boldface) ? parseFloat(prices.boldface) : 0;
          total += (oOptions.options.viewCounter.isActive===false && model.options.viewCounter) ? parseFloat(prices.viewCounter) : 0;
          total += (oOptions.options.highlight.isActive===false && model.options.highlight) ? parseFloat(prices.highlight) : 0;
	  
          return total.toFixed(2);
        };

        /**
         * init
         */
        var init = function() {
          $log.log('item.options.payment.controller.init');
          var p = optionsPrices.data;
          if (p.showcase) {
            prices.showcase = (p.showcase.price/100).toFixed(2);
            prices.boldface = (p.boldface.price/100).toFixed(2);
            prices.viewCounter = (p.viewCounter.price/100).toFixed(2);
            prices.highlight = (p.highlight.price/100).toFixed(2);
          }
          var total = 0;
          for (var key in model.options) {
            total += model.options[key] ? p[key].price : 0;
          }
          total = (total/100).toFixed(2);
          subTotal = total;

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

        angular.extend(this, {
	  options:oOptions,
          model:model,
          categories:categories,
          optionsPrices:optionsPrices.data,
          pay:pay,
          prices:prices,
          subTotal:subTotal,
          total:total,
          processingFee:processingFee,
          taxes:taxes,
          calcTotal:calcTotal
        });
      }
    ]
  );
})(angular);
