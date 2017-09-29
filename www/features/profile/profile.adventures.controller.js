/**
 * @fileOverview
 * @name profile.adventures.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'profile.adventures.controller',
    [
      '$window',
      '$alert',
      '$log',
      'categories',
      'adventures',
      'categoryService',
      'profileAdventuresService',
      '$timeout',
      function($window, $alert, $log, categories, adventures, categoryService, profileAdventuresService, $timeout) {

        var visible=false;
        var model ={};

        model.swipe = {};

        model.swipe.left = function(adventure) {
          adventure.visible=true;
        };

        model.swipe.right = function(adventure) {
          adventure.visible=false;
        };

        var output = {
          list:adventures.data.docs,
          count:adventures.data.docs.length,
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
          if (doNotLoadMore || output.loading || adventures.numFound <= 0 || adventures.numFound <= profileAdventuresService.rows) return;
          console.log("output before loading more: ", output.list);
          console.log("loading more...");
          output.loading = true;
          return profileAdventuresService.list.fetch.user.all().then(
            function(resp) {
              for(var i=0;i<resp.data.data.docs.length;i++) {
                if(output.count < resp.data.data.numFound) {
                  output.list.push(resp.data.data.docs[i]);
                  output.count++;
                }
              }
              profileAdventuresService.start = output.count;
              output.loading = false;
              console.log("loading more... OK",resp);
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
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileAdventures:true};
          alerts.profileAdventures=true;
          $window.localStorage.alerts=JSON.stringify(alerts);
        };

        /**
         * init
         */
        var init = function() {
          $log.log('profile.adventures.controller.init');
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
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileAdventures:false};
          if (alerts.profileAdventures) {
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
            visible:visible,
            category:category,
            loadMore:loadMore,
            output:output
          }
        );
      }
    ]
  );
})(console, angular);
