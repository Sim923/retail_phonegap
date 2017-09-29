/**
 * @fileOverview
 * @name profile.purchased.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "profile.purchased.controller",
    [
      '$state',
      '$window',
      '$alert',
      'refunds',
      'purchases',
      'profilePurchasedService',
      function($state, $window, $alert, refunds, purchases, profilePurchasedService) {

        var items = angular.copy(purchases.data);
        var visible = false;
        var oRefunds = angular.copy(refunds.data);
        var iRefunds = {};

        var $this=this;

        var swipe = {};



        var selectedFilter = {};
        var filter = [
          {
            id : "",
            text : "All Purchases",
          },{
            id : "1",
            text : "Send feedback",
          }, {
            id : "2",
            text : "A seller has accepted your offer",
          }, {
            id : "3",
            text : "You have received an offer",
          }, {
            id : "4",
            text : "You sold an item",
          }
        ];


        /**
         * swipe.left
         * @param {} item
         */
        swipe.left = function(item) {
          item.visible=true;
        };

        /**
         * swipe.right
         * @param {} item
         */
        swipe.right = function(item) {
          item.visible=false;
        };

        /**
         * goToFeedback
         * @param {string} listingId
         */
        var goToFeedback = function(id) {
          profilePurchasedService.goToFeedback(id);
        };

        /**
         * goToListing
         * @param {string} listingId
         */
        var goToListing = function(listingId) {
          $state.go("home.item", {id:listingId});
        };

        /**
         * goToRefund
         * @param {string} id
         */
        var goToRefund = function(id) {
          profilePurchasedService.goToRefund(id);
        };

        /**
         * goToClaim
         * @param {string} id
         */
        var goToClaim = function(id) {
          profilePurchasedService.goToRefund(id);
        };

        /**
         * hide
         */
        var hide = function() {
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profilePurchased:true};
          alerts.profilePurchased=true;
          $window.localStorage.alerts=JSON.stringify(alerts);
        };

        /**
         * init
         */
        var init = function() {
          console.log('profile.purchased.controller');
          var a = {
            container:"#alerts-container",
            title: '',
            content:'<i class="fa fa-info-circle"></i> Swipe left over any row to show additional actions.',
            placement: 'top',
            type: 'info',
            keyboard: true,
            show: true,
            onHide:hide
          };
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profilePurchased:false};
          if (alerts.profilePurchased) {
            console.log('skip alert');
          } else {
            $alert(a);
          }
          for (var i = 0; i < oRefunds.length; i++) {
            var saleId=oRefunds[i].saleId;
            iRefunds[saleId] = oRefunds[i];
          }

          selectedFilter = {
            id : "",
            text : "All Purchases"
          };

        };
        init();

        angular.extend(
          this,
          {
            swipe:swipe,
            refunds:iRefunds,
            purchases:items,
            goToListing:goToListing,
            goToFeedback:goToFeedback,
            goToRefund:goToRefund,
            goToClaim:goToClaim,
            selectedFilter:selectedFilter,
            filter:filter
          }
        );
      }
    ]
  );
})(console, angular);
