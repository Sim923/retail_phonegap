/**
 * @fileOverview login view controller 
 * @name search.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'search.controller',
    [
      '$log',
      '$state',
      'categories',
      'searchService',
      '$timeout',
      function($log, $state, categories, searchService, $timeout) {

        var oCategories = angular.copy(categories.data);
        console.log(oCategories);
        var model={};
        model.term='';
        model.type="";
        model.start=0;
        model.rows=12;
        model.category = ['','',''];
        model.handcrafted='';
        model.shipping='';

        var sort = {options:[], selected:{field:"postedDate", reverse:true}};

        var results = {
          items:[],
          count:0,
          loading:false
        };

        var $this=this;

        /**
         * filter
         * @param {object} item
         * @returns {boolean} 
         */
        var filter = function(item) {
          console.log('item', model, item);
          var result = false;
          if (item.type===model.type || model.type==="") result = true;
          if (model.type==="Listing") {
            result &= model.category[0]==="" ? true : oCategories[model.category[0]]._id==item.cat[0];
            var ListingSub=model.category[1]==="" ? "" : oCategories[model.category[0]].subcategories;
            result &= ListingSub==="" ? true : model.category[1] ? ListingSub[model.category[1]]._id==item.cat[1] : true;
            var ListingSubSub=model.category[2]==="" ? "" : ListingSub[model.category[1]].subcategories;
            result &= ListingSubSub==="" ? true : model.category[2] ? ListingSubSub[model.category[2]]._id==item.cat[2] : true;
          } else if (model.type==="Adventure") {
            result &= model.category[0]==="" ? true : oCategories[5]._id==item.cat[0];
            var AdventureSub=model.category[1]==="" ? "" : oCategories[5].subcategories;
            result &= AdventureSub==="" ? true : model.category[1] ? AdventureSub[model.category[1]]._id==item.cat[1] : true;
            var AdventureSubSub=model.category[2]==="" ? "" : AdventureSub[model.category[1]].subcategories;
            result &= AdventureSubSub==="" ? true : model.category[2] ? AdventureSubSub[model.category[2]]._id==item.cat[2] : true;
          }
          if (model.type==="Listing") {
            result &= model.handcrafted==="" ? true : model.handcrafted==="Yes" ? item.isHandcrafted ? true : false : true;
            result &= model.shipping==="" ? true : model.shipping==="Yes" ? item.isFreeShipping ? true : false : true;
          }
          return result;
        };

        /**
         * changeSort
         * @param {string} option
         * @param {boolean} setup
         */
        var changeSort = function(option, setup) {
          if (option==="low-to-high") {
            sort.selected = model.type==="Listing" ? "ourPrice" : "price";
          } else if (option==="high-to-low") {
            sort.selected = model.type==="Listing" ? "-ourPrice" : "-price"; 
          } else {
            sort.selected = "postedDate";
          }
          console.log(sort.selected);
          var options = [
            { text:"Most Recent First", click:"most-recent"},
            { text:"Price Low to high", click:"low-to-high"},
            { text:"Price High to Low", click:"high-to-low"}
          ];
          sort.options=[];
          for (var i=0; i < options.length; i++) {
            var text = "<i class='fa fa-fw ";
            if (option==options[i].click) {
              text += "fa-check";
            } else {
              text += "text-muted";
            }
            text += " '></i>&nbsp;";
            text += options[i].text;
            var click = "sc.changeSort('" + options[i].click + "')";
            console.log(text, click);
            if (model.type==="Adventure" || model.type==="Listing") {
              sort.options.push({
                "text": text,
                "click": click
              });
            }
          }
        };

        /**
         * search
         * @param {string} searchText
         */
        var search = function() {
          if (results.loading || (model.term === "")) return;
          results.items = [];
          results.count = 0;
          model.start = results.count;
          console.log("searching...");
          results.loading = true;
          searchService.model.set(model);
          if (model.type==='') {
            searchService.search.all().then(
              function(resp) {
                console.log(resp);
                results.loading = false;
                if(resp.data===null||resp.data===undefined) return;
                for(var i=0;i<resp.data.data.docs.length;i++) {
                  if(results.count < resp.data.data.numFound) {
                    results.items.push(resp.data.data.docs[i]);
                    results.count++;
                  }
                }
                model.start = results.count;
                console.log("searching... OK: ",results.items);
              },
              function(resp) {
                results.loading = false;
              }
            );
          } else if (model.type==='Listing') {
            searchService.search.listings().then(
              function(resp) {
                results.items=resp.data.data.docs;
                results.loading = false;
              },
              function(resp) {
                results.loading = false;
              }
            );
          } else if (model.type==='Adventure') {
            searchService.search.adventures().then(
              function(resp) {
                results.items=resp.data.data.docs;
                results.loading = false;
              },
              function(resp) {
                results.loading = false;
              }
            );
          }
        };

        var makeactive = function(value){
          $this.step = value;
        }

        var doNotLoadMore = true;
        var loadMore = function() {
          if(doNotLoadMore) {
            $timeout(function() {
              doNotLoadMore = false;
            }, 10);
          }
          console.log(doNotLoadMore, results.loading, results.items.length, results.count, (results.items.length <= 0 || results.count), (results.count <= searchService.model._model.rows));
          if (doNotLoadMore || results.loading || results.items.length <= 0 || results.count < searchService.model._model.rows) return;
          console.log("loading more...");
          results.loading = true;
          searchService.model.set(model);
          if (model.type==='') {
            searchService.search.all().then(
              function(resp) {
                console.log(resp);
                for(var i=0;i<resp.data.data.docs.length;i++) {
                  if(results.count < resp.data.data.numFound) {
                    results.items.push(resp.data.data.docs[i]);
                    results.count++;
                  }
                }
                model.start = results.count;
                console.log("loading more... OK: ",results.items);
                results.loading = false;
              },
              function(resp) {
                console.log('error', resp);
                results.loading = false;
              }
            );
          } else if (model.type==='Listing') {
            searchService.search.listings().then(
              function(resp) {
                results.items=resp.data.data.docs;
                results.loading = false;
              },
              function(resp) {
                results.loading = false;
              }
            );
          } else if (model.type==='Adventure') {
            searchService.search.adventures().then(
              function(resp) {
                results.items=resp.data.data.docs;
                results.loading = false;
              },
              function(resp) {
                results.loading = false;
              }
            );
          }
        };

        /**
         * init
         */
        var init = function() {
          $log.log('search.controller.init');
          changeSort('most-recent', true);
          console.log($state.current.name+"----------------xxxx");
        };

        init();

        angular.extend(
          this, {
            model:model,
            categories:oCategories,
            changeSort:changeSort,
            sort:sort,
            search:search,
            filter:filter,
            results:results,
            loadMore:loadMore,
            makeactive:makeactive
          }
        );
      }
    ]
  );
})(console, angular);
