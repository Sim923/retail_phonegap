/**
 * @fileOverview
 * @name cart.shipping.contoller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "cart.shipping.controller",
    [
    'addresses',
      'cart',
      'itemService',
      'addressService',
      'cartShippingService',
      function (addresses, cart, listingService, addressesService, cartShippingService) {

        var items = cart.data;
        var aAddresses = addresses.data;
        var model = cartShippingService.model.get();
        var cartShippingError = "";
        var $this = this;

        console.log("id ------ "+model._id+" --------------- "+aAddresses+" ------  "+model);

          // model.contact = 'Edinburgh';
          // model.line1 = 'Address line1';
          // model.line2 = 'Address lin 2';
          // model.city = 'memphis';
          // model.zipCode = '38120';
          // model.phone = '9999999999';
          // model.email = 'Umang.tech.expert@gmail.com';
          // model.state = 'TN';

          model.contact = '';
          model.line1 = '';
          model.line2 = '';
          model.city = '';
          model.zipCode = '';
          model.phone = '';
          model.email = '';
          model.state = '';
        

        /**
         * goToPayment
         */
        var goToPayment=function() {
          var id = items[0].sellerId._id;
          return cartShippingService.goToPayment(id);
        };

        /**
         * processingFee
         * @returns {number} 
         */
        var processingFee = function() {
          var total = 0.0;
          for (var i=0; i < items.length; i++) {
            var item = parseFloat((items[i].listingId.flatShippingRate + items[i].price) * items[i].quantity * 0.01);
            var pf = parseFloat((item * 0.0299).toFixed(2));
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
            total += (items[i].listingId.flatShippingRate) * items[i].quantity * 0.01;
          }
          return total;
        };

        /**
         * subtotal
         * @returns {number} 
         */
        var subtotal =  function() {
          var total = 0.0;
          for (var i=0; i<items.length; i++) {
            total += (items[i].price) * items[i].quantity * 0.01;
          }
	          total += processingFee();
          return total;
        };

        /**
         * total
         */
        var total = function() {
          var total = 0.0;
          for (var i=0; i<items.length; i++) {
            total += (items[i].listingId.flatShippingRate + items[i].price) * items[i].quantity * 0.01;
          }
          return total;
        };

        /**
         * save
         */
        var save = function() {
          console.log(model);
          if (model._id) {
            var id = items[0].sellerId._id;
            console.log('model has id: ', id);
            return cartShippingService.goToPayment(id);
          } else {
            console.log('model has no id');
            cartShippingService.model.set(model);
            console.log('model has no id '+JSON.stringify(model));
            cartShippingService.validate(model).then(
              function(resp) {
                console.log('resp of validate: ', JSON.stringify(resp));
                model.shippoId=resp.data.address.address.shippoId;
                cartShippingService.model.set(model);
                cartShippingService.save().then(
                  function(resp) {
                    console.log("---------- "+JSON.stringify(resp));
                    addressesService.model.set(resp.data);
                    var id = items[0].sellerId._id;
                    return cartShippingService.goToPayment(id);
                  },
                  function(resp) {
                    console.log("rsp --- "+JSON.stringify(resp));
                  }
                );
              },
              function(resp) {
                cartShippingError=resp.data.message;
              }
            );
          }
        };

        /**
         * reset
         */
        var reset = function() {
          model.contact= '';
          model.line1= '';
          model.line2 = '';
          model.city = '';
          model.zipCode = '';
          model.phone = '';
          model.email = '';
          model.state = '';
          console.log(model);
        };

        /**
         * savedAddressChange
         * @param {object} address
         */
        var savedAddressChange = function(address) {
          if (address) {
            console.log(address);
            cartShippingService.model.set(address);
            addressesService.model.set(address);
            model = cartShippingService.model.get();
          } else {
            cartShippingService.model.set(null);
            console.log("id ------ "+model._id+" --------------- "+aAddresses+" ------  "+model);
          }
        };

        /**
         * init
         */
        var init=function() {
          console.log('cart.shipping.controller');
        };

        init();

        angular.extend(this, {
          model:model,
          cartShippingError:cartShippingError,
          reset:reset,
          savedAddressChange:savedAddressChange,
          addresses:aAddresses,
          cart:items,
          shippingFee:shippingFee,
          processingFee:processingFee,
          subtotal:subtotal,
          total:total,
          save:save,
          goToPayment:goToPayment
        });
      }
    ]
  );
})(console, angular);
