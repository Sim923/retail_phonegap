/**
 * @fileOverview
 * @name top.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'top.controller',
    [
      '$state',
      '$timeout',
      'bottomService',
      'topService',
      '$window',
      function($state, $timeout, bottomService, topService, $window) {

        var data = {};

        data.cartCount = 0;
        data.notificationCount = 0;
        data.back = {
          state:"",
          type:"",
          category:{}
        };

        var $this = this;

        /**
         * back
         */
        var back = function() {
          if ($state.includes("home.item") || $state.includes("home.adventure")) {
            var type = topService.data.get("back").type;
            var category = topService.data.get("back").category;
            var all = topService.all.get();
            if (all) {
              goTo(type, {}, all);
            } else {
              goTo(type, category, false);
            }
          } else if ($state.includes("home.category")) {
            $state.go("home");
          } else if ($state.includes("messaging")) {
            bottomService.visible=true;
            $window.history.back();
          } else if ($state.includes("home.cart")) {
            $window.history.back();
          } else {
            $window.history.back();
          }
        };

        /**
         * goTo
         * @param {string} type
         * @param {object} category
         * @param {boolean} all
         */
        var goTo = function(type, category, all) {
          console.log('goTo', type, category, all);
          if (type==='Listing') {
            $state.go('home.category', {type:type, idLvl0:category._id, all:all});
          } else {
            $state.go('home.category', {type:type, idLvl1:category._id, all:all});
          }
        };
        

        /**
         * refresh
         * @param {string} property
         * @param {object} value
         */
        var refresh = function(property, value) {
          $this.data[property] = value;
          data[property] = value;
        };

        /**
         * incrementCartCount
         */
        var incrementCartCount = function() {
          $this.data.cartCount++;
        };

        /**
         * resetCartCount
         */
        var resetCartCount = function() {
          $this.data.cartCount = 0;
        };

        var init = function() {
          console.log('top.controller.init');
          topService.setRefreshCallback(refresh);
        };

        init();

        angular.extend(this, {
          data:data,
          back:back,
          refresh:refresh,
          incrementCartCount:incrementCartCount,
          resetCartCount:resetCartCount
        });
      }
    ]
  );
})(console, angular);
