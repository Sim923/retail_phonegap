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
    'profile.items.controller',
    [
      '$window',
      '$log',
      '$alert',
      'categories',
      'categoryService',
      'listings',
      'profileItemsService',
      '$timeout',
      function($window, $log, $alert, categories, categoryService, listings, profileItemsService, $timeout) {

        var model ={};

        model.swipe = {};

        model.swipe.left = function(item) {
          item.visible=true;
        };

        model.swipe.right = function(item) {
          item.visible=false;
        };

        var output = {
          list:listings.data.docs,
          count:listings.data.docs.length,
          loading:false
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

        var doNotLoadMore = true;
        var loadMore = function() {
          if(doNotLoadMore) {
            $timeout(function() {
              doNotLoadMore = false;
            }, 10);
          }
          if (doNotLoadMore || output.loading || listings.numFound <= 0 || listings.numFound <= profileItemsService.rows) return;
          console.log("output before loading more: ", output.list);
          console.log("loading more...");
          output.loading = true;
          return profileItemsService.list.fetch.user.all().then(
            function(resp) {
              console.log("loading more... OK");
              for(var i=0;i<resp.data.data.docs.length;i++) {
                if(output.count < resp.data.data.numFound) {
                  output.list.push(resp.data.data.docs[i]);
                  output.count++;
                }
              }
              profileItemsService.start = output.count;
              output.loading = false;
            },
            function(resp) {
              output.loading = false;
            }
          );
        };

        /**
         * hide
         */
        var hide = function() {
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileItems:true};
          alerts.profileItems=true;
          $window.localStorage.alerts=JSON.stringify(alerts);
        };

        /**
         * init
         */
        var init = function() {
          $log.log('profile.items.controller.init');
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
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileItems:false};
          if (alerts.profileItems) {
            console.log('skip alert');
          } else {
            $alert(a);
          }
        };

        init();

        angular.extend(
          this,
          {
            model:model,
            category:category,
            loadMore:loadMore,
            output:output
          }
        );
      }
    ]
  );
})(console, angular);
