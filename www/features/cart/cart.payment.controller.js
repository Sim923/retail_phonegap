/**
 * @fileOverview
 * @name cart.payment.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'cart.payment.controller',
    [
      'taxes',
      'cart',
      'itemService',
      'addressService',
      'paymentGatewayService',
      'cartPaymentService',
      function (taxes, cart, listingService, addressService, paymentGatewayService, cartPaymentService) {
	
	var paymentType = "Credit Card";
        var oTaxes=angular.copy(taxes.data);
        var tTaxes = oTaxes.total;
        var items = cart.data;
        var error = "";
        var sameAsShipping = true;
        var model = addressService.model.get();   // this is a billing address
        var address = addressService.model.get(); // this is a shipping address
        var $this=this;

        /**
         * sameAsShippingChanged
         * @param {boolean} value
         */
        var sameAsShippingChange = function(value) {
          console.log('cart.payment.controller.sameAsShippingChange', value);
          if (value) {
            $this.model=addressService.model.get();
            cartPaymentService.model.set(model);
          } else {
            console.log('uncheck');
            reset();
          }
        };

        /**
         * reset
         */
        var reset = function() {
          console.log('reset');
          $this.model=null;
        };

        /**
         * goToListing
         * @param {string} id
         */
        var goToListing = function(id) {
          listingService.view(id);
        };

        /**
         * purchase
         */
        var purchase = function() {
          cartPaymentService.model.set($this.model);
          if (sameAsShipping) {
            console.log(address._id);
            transaction();
          } else {
            cartPaymentService.validate().then(
              function(resp) {
                cartPaymentService.save().then(
                  function(resp) {
                    console.log(resp);
                    address=angular.copy(resp.data);
                    transaction();
                  },
                  function(resp) {
                    console.log(resp);
                  }
                );
              },
              function(resp) {
                error=resp.data.message;
              }
            );
          }
        };

        var selected = function(changed) {
          return !!!changed;
        };

        /**
         * transaction
         */
        var transaction = function() {
          console.log("one");
          paymentGatewayService.tokens._hostedFieldsInstance.braintree.tokenize(
            function (tokenizeErr, payload) {
              console.log("two");
              if (tokenizeErr) {
                console.log("error ----");
                switch (tokenizeErr.code) {
                  case 'HOSTED_FIELDS_FIELDS_EMPTY':
                  $this.error='All the credit card fields are empty! Please fill out the form.';
                  break;
                  case 'HOSTED_FIELDS_FIELDS_INVALID':
                  $this.error='Some fields are invalid';
                  break;
                  case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
                  $this.error='Tokenization failed server side. Is the card valid?';
                  break;
                  case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
                  $this.error='Network error occurred when tokenizing.';
                  break;
                  default:
                  $this.error='Something bad happened!';
                }
              } else {
                console.log('Got nonce:', payload.nonce);

                var s = {
                  taxes:tTaxes,
                  itemTaxes:oTaxes.items,
                  processingFee:processingFee(),
                  token:payload.nonce,
                  sellerId:items[0].sellerId._id,
                  addresses:{
                    billing: {
                      buyer:model._id
                    },
                    shipping: {
                      buyer:address._id
                    }
                  }
                };
                console.log('s payload: ', s);
                cartPaymentService.checkout(s).then(
                  function(resp) {
                    console.log('success', resp);
                    cartPaymentService.goToSuccess(items[0].sellerId._id);
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
         * processingFee
         * @returns {number} 
         */
        var processingFee = function() {
          var total = 0.0;
          for (var i=0; i < items.length; i++) {
            var item = parseFloat((items[i].listingId.flatShippingRate + items[i].price) * items[i].quantity * 0.01);
            var tax = (typeof(items[i].tax)==="undefined" ? 0 : items[i].tax ) * items[i].quantity;
            var pf = parseFloat(((item+tax) * 0.0299).toFixed(2));
            total += pf;
          }
          total+=0.45;
          return total;
        };

        /**
         * shippingFee
         * @returns {number} 
         */
        var shippingFee = function() {
          var total = 0.0;
          for (var i=0; i<items.length; i++) {
	    total += items[i].listingId.flatShippingRate * items[i].quantity * 0.01;
          }
          return total;
        };

        /**
         * subtotal
         * @returns {number} 
         */
        var subtotal = function() {
          var total = 0.0;
          for (var i=0; i<items.length; i++) {
            total += items[i].quantity * items[i].price * 0.01;
          }
          return total;
        };

        /**
         * total
         */
        var total = function() {
          var total = 0.0;
          for (var i=0; i<items.length; i++) {
            total += items[i].quantity * items[i].price * 0.01;
	    total += items[i].listingId.flatShippingRate * items[i].quantity * 0.01;
          }
	  total += tTaxes;
	  total += processingFee();
          return total;
        };

        /**
         * totalTaxes
         * @returns {number} 
         */
        var totalTaxes = function() {
          var total=0.0;
          for (var i=0; i < items.length; i++) {
            total += parseFloat((typeof(items[i].tax)==="undefined" ? 0 : items[i].tax) * items[i].tax);
          }
          return total;
        };

        /**
         * init
         */
        var init = function () {
          console.log("cart.payment.controller.init");

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
          for (var j = 0; j < items.length; j++ ) {
            for (var i = 0; i < oTaxes.items.length; i++) {
              if (oTaxes.items[i].ItemKey==items[j].listingId._id) {
                items[j].tax = parseFloat(oTaxes.items[i].SalesTaxAmount).toFixed(2);
                console.log(items[j]);
                break;
              }
            }
          }
        };

        init();

        angular.extend(
          this,
          {
	    paymentType:paymentType,
            address:address,
            taxes:oTaxes,
            model:model,
            sameAsShipping:sameAsShipping,
            sameAsShippingChange:sameAsShippingChange,
            error:error,
            goToListing:goToListing,
            cart:items,
            purchase:purchase,
            shippingFee:shippingFee,
            processingFee:processingFee,
            subtotal:subtotal,
            total:total,
            reset:reset
          }
        );
      }
    ]
  );
})(console, angular);
