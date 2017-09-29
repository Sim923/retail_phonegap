/**
 * @fileOverview
 * @name shipping.summary.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'shipping.summary.controller',
    [
      'sale',
      'addresses',
      'labels',
      'paymentGatewayService',
      'shippingSummaryService',
      '$state',
      function(sale, addresses, labels, paymentGatewayService, shippingSummaryService, $state) {

        var oSale=angular.copy(sale.data);
        var id=oSale._id;
        var oAddresses=angular.copy(addresses.data);
        var shippingLabels = angular.copy(labels.data);
        var selectedSellerAddress=null;
        var sameAsShipping = true;
        var shippoTransactions = [];
        var labelChargeId = "";
        var address = {};
        var error = "";
        var isProcessing=false;
        console.log('oSale: ', oSale);

        var $this=this;

        var processingFee = function() {
          var total = 0.0;
          for (var i = 0; i < $this.shippingLabels.length; i++) {
            var text = $this.shippingLabels[i].option.amount;
            total += parseFloat(text);
          }
          var processingFee = (total * 0.0299 + 0.45);
          return processingFee.toFixed(2);
        };

        /**
         * total
         * @returns {number}
         */
        var total = function() {
          var total = 0.0;
          for (var i = 0; i < $this.shippingLabels.length; i++) {
            var text = $this.shippingLabels[i].option.amount;
            total += parseFloat(text);
          }
          return total.toFixed(2);
        };

        /**
         * transaction
         */
        var purchase = function() {
          $this.isProcessing=true;
          console.log('purchase on going: ', $this.isProcessing);
          paymentGatewayService.tokens._hostedFieldsInstance.braintree.tokenize(
            function (tokenizeErr, payload) {
              if (tokenizeErr) {
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
                  token:payload.nonce,
                  sellerId:oSale._id,
                  total:total()
                };
                shippingSummaryService.pay(s).then(
                  function(resp) {
                    console.log('success', resp.data);
                    var paymentGateway=resp.data;
                    completeShipping(paymentGateway);
                  },
                  function(resp) {
                    console.log('fail', resp);
                    $this.isProcessing=false;
                  }
                );
              }
            }
          );
        };

        /**
         * saveAddress
         */
        var saveAddress = function() {
          if ($this.selectedSellerAddress) {
            console.log('selectedSellerAddress', $this.selectedSellerAddress);
            if ($this.selectedSellerAddress.shippoId) {
              shippingSummaryService.address.set($this.selectedSellerAddress);
              shippingSummaryService.address.save().then(
                function(resp) {
                  var seller = angular.copy(resp.data);
                  oSale.addresses.shipping.seller=seller;
                  var addresses = {
                    shipping : {
                      buyer:oSale.addresses.shipping.buyer._id,
                      seller:oSale.addresses.shipping.seller._id
                    },
                    billing : {
                      buyer:oSale.addresses.billing.buyer._id,
                      seller:$this.selectedSellerAddress._id
                    }
                  };
                  shippingSummaryService.sale.addresses.update(id, addresses).then(
                    function(resp) {
                      console.log(resp);
                    },
                    function(resp) {
                      console.log(resp);
                    }
                  );
                },
                function(resp) {
                }
              );
            } else {
              console.log('Missing shippoId');
            }
          } else {
            shippingSummaryService.address.set(address);
            shippingSummaryService.address.validate().then(
              function(resp) {
                address.shippoId=resp.data.address.address.shippoId;
                address.zipCode=resp.data.address.address.zip_code;
                shippingSummaryService.address.set(address);
                shippingSummaryService.address.save().then(
                  function(resp) {
                    var seller = angular.copy(resp.data);
                    oSale.addresses.shipping.seller=seller;
                    var addresses = {
                      shipping : {
                        buyer:oSale.addresses.shipping.buyer._id,
                        seller:oSale.addresses.shipping.seller._id
                      },
                      billing : {
                        buyer:oSale.addresses.billing.buyer._id,
                        seller:seller._id
                      }
                    };
                    shippingSummaryService.sale.addresses.update(id, addresses).then(
                      function(resp) {
                        console.log(resp);
                      },
                      function(resp) {
                        console.log(resp);
                      }
                    );
                  },
                  function(resp) {
                  }
                );
              },
              function(resp) {
              }
            );
          }
        };

        /**
         * addressChanged
         * @param {object} address
         */
        var addressChanged = function(address) {
          console.log('addressChanged', address);
          if (address==="") {
            $this.address={};
          } else {
            $this.address=angular.copy(address);
          }
        };

        /**
         * processLabels
         * @param {array} labels
         */
        var processLabels = function(labels) {
          var label = labels.shift();
          shippingSummaryService.labels.save(label, oSale, label.carrier).then(
            function(response) {
              var transaction = response.data;
              shippoTransactions.push(transaction);
              console.log('transaction pushed: ', transaction);
              $state.go('profile.sales');
              if (labels.length > 0) {
                processLabels(labels);
              } else {
                shippingSummaryService.labels.reset();
                $this.shippingLabels = [];
              }
            },
            function(resp) {
              console.log(resp.data.message, "danger");
            }
          );
        };

        /**
         * completeShipping
         */
        var completeShipping = function(paymentGateway) {
          var labels = $this.shippingLabels;
          for (var i=0; i < labels.length; i++) {
            $this.shippingLabels[i].paymentGateway=paymentGateway;
          }
          processLabels(labels);
        };

        /**
         * reset
         */
        var reset = function() {
        };

        /**
         * init
         */
        var init = function() {
          console.log('shipping.summary.controller');
          var styles = {
            'input': {
	      'display': 'block',
	      'width': '100%',
	      'height': '34px',
	      'padding': '6px 12px',
	      'font-family': 'Georgia, serif',
	      'font-size': '14px',
	      'font-weight': 'normal',
	      'line-height': '1.42857143',
	      'color': '#555',
	      'background-color': '#fff',
	      'background-image': 'none',
	      'border': '1px solid #ccc',
	      'border-radius': '0',
	      '-webkit-box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, .075)',
	      'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, .075)',
	      '-webkit-transition': 'border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s',
	      '-o-transition': 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
	      'transition': 'border-color ease-in-out .15s, box-shadow ease-in-out .15s'
            },
            ':focus': {
	      'border-color': '#66afe9',
	      'outline': '0',
	      '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6)',
	      'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6)'
            },
            '.valid': {
	      'border-color': '#3c763d',
	      '-webkit-box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, .075)',
	      'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, .075)'
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
          total:total,
          processingFee:processingFee,
          error:error,
          sale:oSale,
          addresses:oAddresses,
          selectedSellerAddress:selectedSellerAddress,
          address:address,
          addressChanged:addressChanged,
          reset:reset,
          saveAddress:saveAddress,
          purchase:purchase,
          sameAsShipping:sameAsShipping,
          shippingLabels:shippingLabels,
          isProcessing:isProcessing
        });
      }
    ]
  );
})(console, angular);
