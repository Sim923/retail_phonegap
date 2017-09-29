/**
 * @fileOverview
 * @name adventure.payment.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'adventure.payment.controller',
    [
      '$log',
      '$state',
      'adventureService',
      'categories',
      'options',
      'adventuresOptionsPrices',
      'paymentGatewayService',
      'adventureOptionsPaymentService',
      function AdventurePaymentController($log, $state, adventureService, categories, options, adventuresOptionsPrices, paymentGatewayService, adventureOptionsPaymentService) {
	
        var model = adventureService.model.get(); 
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

                var s = {
                  adventureId:adventureService.id.get(),
		  total:calcTotal(),
		  listingDays:model.listingDays,
                  options:model.options,
                  token:payload.nonce
                };
                adventureOptionsPaymentService.model.set(s);
                var method = 'pay';
                adventureOptionsPaymentService[method]().then(
                  function(resp) {
                    console.log('success', resp);
                    $state.go('profile.adventures');
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
         * paid
         * @param {string} option
         * @returns {boolean} 
         */
        var paid = function(option) {
          return (typeof(oOptions.options[option].paymentGateways)==="undefined" && model.options[option]);
        };

        /**
         * daysPaid
         * @returns {boolean} 
         */
        var daysPaid = function() {
          return typeof(oOptions.paymentGateways.braintree)==="undefined";
        };

        /**
         * processingFee
         * @returns {number} 
         */
        var processingFee = function() {
$log.log('processing fee');

          var total = oOptions.paymentGateways.braintree.paymentMethod ? 0 : (parseFloat(prices.price) * model.listingDays);
          total += paid("showcase") ? parseFloat(prices.showcase) : 0; 
          total += paid("boldface") ? parseFloat(prices.boldface) : 0; 
          total += paid("viewCounter") ? parseFloat(prices.viewCounter) : 0; 
          total += paid("highlight") ? parseFloat(prices.highlight) : 0;
          var processingFee = (total * 0.0299 + 0.45); 
          return parseFloat(processingFee.toFixed(2));
        };

        /**
         * calcTotal
         * @returns {number}
         */
        var calcTotal = function() {
$log.log('calc total');

          var total = oOptions.paymentGateways.braintree.paymentMethod ? 0 : (parseFloat(prices.price) * model.listingDays);
          total += paid("showcase") ? parseFloat(prices.showcase) : 0; 
          total += paid("boldface") ? parseFloat(prices.boldface) : 0; 
          total += paid("viewCounter") ? parseFloat(prices.viewCounter) : 0; 
          total += paid("highlight") ? parseFloat(prices.highlight) : 0; 
          return parseFloat(total.toFixed(2));
        };

        /**
         * back
         */
        var back = function() {
          adventureService.model.set(model);
          $state.go('adventure-wizard.step4');
        };
        
        /**
         * init
         */
        var init = function() {
          $log.log('adventure.payment.controller.init');
	  var p = adventuresOptionsPrices.data;
	  if (p.showcase) {
	    prices.price = (p.price/100).toFixed(2);
	    prices.showcase = (p.showcase.price/100).toFixed(2);
	    prices.boldface = (p.boldface.price/100).toFixed(2);
	    prices.viewCounter = (p.viewCounter.price/100).toFixed(2);
	    prices.highlight = (p.highlight.price/100).toFixed(2);
	  }
	  
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
          model:model,
          categories:categories,
          options:oOptions,
          adventuresOptionsPrices:adventuresOptionsPrices.data,
          pay:pay,
          back:back,
          total:total,
          prices:prices,
          subTotal:subTotal,
          processingFee:processingFee,
          taxes:taxes,
          calcTotal:calcTotal
        });
      }
    ]
  );
})(console, angular);
