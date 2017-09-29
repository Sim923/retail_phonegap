/**
 * @fileOverview
 * @name profile.sales.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "profile.sales.controller",
    [
      '$window',
      '$alert',
      'sales',
      'profileSalesService',
      'itemService',
      function($window, $alert, sales, profileSalesService, itemService) {
        var items = sales.data;
        var visible = false;
        var model = profileSalesService.model.get();
        var $this=this;

        model.swipe = {};

        model.swipe.right = function(item) {
          console.log("swipe.right");
          item.visible=false;
        };

        model.swipe.left = function(item) {
          console.log("swipe.left");
          item.visible=true;
        };

        /**
         * hide
         */
        var hide = function() {
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileSales:true};
          alerts.profileSales=true;
          $window.localStorage.alerts=JSON.stringify(alerts);
        };

        /**
         * init
         */
        var init = function() {
          console.log('profile.sales.controller.init');
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
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileSales:false};
          if (alerts.profileSales) {
            console.log('skip alert');
          } else {
            $alert(a);
          }
        };

        init();

        /**
         * goToListing
         * @param {object} listing
         */
        var goToListing = function(listing) {
          itemService.view(listing);
        };

        /**
         * goToFeedback
         * @param {string} id
         */
        var goToFeedback = function(id) {
          profileSalesService.goToFeedback(id);
        };

        /**
         * goToShipping
         * @param {string} id
         */
        var goToShipping = function(id) {
          profileSalesService.goToShipping(id);
        };

        /**
         * goToRefund
         * @param {string} id
         */
        var goToRefund = function(id) {
          profileSalesService.goToRefund(id);
        };

        angular.extend(
          this, {
            model:model,
            goToListing:goToListing,
            goToFeedback:goToFeedback,
            goToShipping:goToShipping,
            goToRefund:goToRefund,
            sales:items
          }
        );
      }
    ]
  );
})(console, angular);
