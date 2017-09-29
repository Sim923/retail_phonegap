/**
 * @fileOverview
 * @name offer.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "item.offer.controller",
    [
      '$state',
      'user',
      'listing',
      'rtsocket',
      'offerService',
      'cartService',
      function ItemOfferController($state, user, listing, rtsocket, offerService, cartService) {
	
        var oUser=angular.copy(user.data);
        var oListing=angular.copy(listing.data);
        var listingId = oListing._id;
        var offerId = null;
        var model = angular.copy(oListing);
        model.numToSell=1;
	model.seller=model.postedByUserId;
	
        var offers = {};
        var offer = {};
        var cart = {};
        var error='';

        var $this=this;

        /**
         * add
         */
        cart.add = function() {
          cartService.add(listingId, model.numToSell);
        };

        /**
         * offer
         */
        offers.offer = function() {
          offer.listingid = listingId;
	  console.log('offers.offer', offer);
	  console.log('offers.offer', $this.offer);
          offerService.offers.offer(offer).then(
            function(resp) {
              console.log(resp);
	      $this.error="";
            },
            function(resp) {
              $this.error=resp.data.message;
            }
          );
        };

        /**
         * accept
         * @param {string} offerId
         */
        offers.accept = function(offerId) {
          var acceptOffer = {};
          acceptOffer.listingid = listingId;
          acceptOffer.offerid = offerId;
          offerService.offers.accept(acceptOffer).then(
            function(resp) {
              console.log(resp);
	      $this.error="";
              if (model.seller._id===oUser._id) {
              } else {
                $state.go("home.cart");
              }
            },
            function(resp) {
              $this.error=resp.data.message;
            }
          );
        };

        /**
         * reject
         * @param {string} offerId
         */
        offers.reject = function(offerId) {
          var rejectOffer = {};
          rejectOffer.listingid = listingId;
          rejectOffer.offerid = offerId;
          offerService.offers.reject(rejectOffer).then(
            function(resp) {
              console.log(resp);
	      $this.error="";
            },
            function(resp) {
              $this.error=resp.data.message;
            }
          );
        };

        /**
         * more
         * @param {string} offerId
         */
        offers.more = function(offerId) {
          offerService.offers.more(listingId, offerId).then(
            function(resp) {
              console.log(resp);
            },
            function(resp) {
              $this.error=resp.data.message;
            }
          );
        };

        /**
         * counterOffer
         * @param {number} offer
         * @param {string} listingid
         * @param {string} offerid
         */
        offers.counter = function(offerId) {
          var counterOffer = {};
          counterOffer.offerPrice = $this.offer.offerPrice;
          counterOffer.listingid = listingId;
          counterOffer.offerid = offerId;
          offerService.offers.counter(counterOffer).then(
            function(resp) {
              console.log(resp);
	      $this.error="";
            },
            function(resp) {
              $this.error=resp.data.message;
            }
          );
        };

        /**
         * convert
         * @param {number} price
         * @returns {number}
         */
        var convert = function(price) {
          return (parseFloat(price)/100).toFixed(2);
        };

        var _callback = function(data) {
          console.log('_callback', data);
          var offer = data.offers[0];
          var o = angular.copy(data);
          $this.model.seller=o.seller;
          $this.model.offers=o.offers;
          $this.model.ourPrice=o.ourPrice;
          console.log(offer, oUser);
          if (offer.isAccepted && offer.fromUserId._id==oUser._id) {
            console.log('cart.service.add call');
            cartService.add(offerService.id.get(), 1);
          }
        };

        /**
         * init
         */
        var init = function() {
          console.log("item.offer.controller.init");
          offerService.controller.callback.set(_callback);
        };
        init();

        angular.extend(this, {
          error:error,
          listingId:listingId,
          offerId:offerId,
          model:model,
          offers:offers,
          offer:offer,
          cart:cart,
          userId:oUser._id,
          convert:convert
        });
      }
    ]
  );
})(console, angular);
