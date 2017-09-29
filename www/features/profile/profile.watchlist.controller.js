/**
 * @fileOverview
 * @name profile.items.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'profile.watchlist.controller',
    [
      '$state',
      '$alert',
      '$window',
      '$log',
      'categoryService',
      'watchesService',
      'watches',
      'profileWatchlistService',
      function($state, $alert, $window, $log, categoryService, watchesService, watches, profileWatchlistService) {

        var model ={};
        model.swipe = {};

        var oWatches = watches.data;
        var $this = this;

        /**
         * model.swipe.left
         * @param {object} watch
         */
        model.swipe.left = function(watch) {
          watch.visible=true;
        };

        /**
         * model.swipe.right
         * @param {object} watch
         */
        model.swipe.right = function(watch) {
          watch.visible=false;
        };

        var selectedFilter = {};
        var filter = [
          {
            id : "",
            text : "All Notifications",
            notification : "You have no notification yet."
          },{
            id : "send",
            text : "Send feedback",
            notification : "You have no feedback yet."
          }, {
            id : "accepted your offer",
            text : "A seller has accepted your offer",
            notification : "You have no seller has accepted your offer yet."
          }, {
            id : "received an offer",
            text : "You have received an offer",
            notification : "You have no offer yet."
          }, {
            id : "sold",
            text : "You sold an item",
            notification : "You have no sales yet."
          }
        ];

        selectedFilter = {
          id : "",
          text : "All notifications",
          notification : "You have no notification yet."
        };


        /**
         * unwatch
         * @param {object} watch
         */
        var unwatch = function(watch) {
          profileWatchlistService.unwatch(watch._id).then(
            function(resp) {
              $state.reload();
            },
            function(resp) {
              console.log(resp.data);
            }
          );
        };

        /**
         * view
         * @param {object} watch
         */
        var view = function(watch) {
          profileWatchlistService.view(watch.listingId._id);
        };

        var category = {};
        category.get = function(l0, l1, l2) {
          var result = { main:'', sub:'', subsub:'' };
          if (typeof(l0)==='string') {
            result.main = categoryService.categories.find(l0);
          } else {
            result.main = l0;
          }
          if (typeof(l1)==='string') {
            result.sub = categoryService.categories.find(l1);
          } else {
            result.sub = l1;
          }
          if (typeof(l2)==='string') {
            result.subsub = categoryService.categories.find(l2);
          } else {
            result.subsub = l2;
          }
          return result;
        };

        /**
         * price
         * @param {number} p
         * @returns {number} 
         */
        var price = function(p) {
          return (parseFloat(p)/100);
        };

        /**
         * hide
         */
        var hide = function() {
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileWatchlist:true};
          alerts.profileWatchlist=true;
          $window.localStorage.alerts=JSON.stringify(alerts);
        };

        /**
         * init
         */
        var init = function() {
          $log.log('profile.watchlist.controller.init');
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
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileWatchlist:false};
          if (alerts.profileWatchlist) {
            console.log('skip alert');
          } else {
            $alert(a);
          }
        };

        init();

        console.log(watches.data);

        angular.extend(
          this,
          {
            model:model,
            watches:oWatches,
            category:category,
            selectedFilter:selectedFilter,
            filter:filter,
            price:price,
            view:view,
            unwatch:unwatch
          }
        );
      }
    ]
  );
})(console, angular);