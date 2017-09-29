/**
 * @fileOverview Search view service
 * @name search.search.js
 * @author Matthew Aaron Raymer (matthew.raymer@anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'searchService',
    [
      'categoryService',
      '$http',
      'baseurlService',
      function(categoryService, $http, baseurlService) {
        var searchService = {};

        var baseUrl = baseurlService.address;

        searchService.search = {};

        searchService.model = {};
        searchService.model._model = {
          start:0,
          rows:100,
          term:'',
          type:'',
          handcrafted:'',
          shipping:'',
          sort:'',
          category:['','','']
        };

        /**
         * model.set
         * @param {object} model
         */
        searchService.model.set = function(model) {
          for (var key in model) {
            if (key==='category') {
              var o = categoryService.categories.id(model.category[0], model.category[1], model.category[2]);
              searchService.model._model.category[0] = o.main;
              searchService.model._model.category[1] = o.sub;
              searchService.model._model.category[2] = o.subsub;
            } else {
              searchService.model._model[key] = model[key];
            }
          }
          console.log(searchService.model._model);
        };

        /**
         * search.listings
         * @returns {callback} 
         */
        searchService.search.listings = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listings/search/freetext",
            data:{
              term:searchService.model._model.term,
              categories:searchService.model._model.category,
              handcrafted:searchService.model._model.handcrafted,
              shipping:searchService.model._model.shipping,
              start:searchService.model._model.start,
              rows:searchService.model._model.rows,
              type:'Listing',
              sort:searchService.sort
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * search.adventures
         * @returns {callback} 
         */
        searchService.search.adventures = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/adventures/search/freetext",
            data:{
              term:searchService.model._model.term,
              categories:searchService.model._model.category,
              start:searchService.model._model.start,
              rows:searchService.model._model.rows,
              type:'Adventure',
              sort:searchService.model._model.sort
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * search.all
         * @returns {callback} 
         */
        searchService.search.all = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/search/freetext",
            data:{
              term:searchService.model._model.term,
              start:searchService.model._model.start,
              rows:searchService.model._model.rows,
              type:'',
              sort:searchService.model._model.sort
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        return searchService;
      }
    ]
  );
})(console, angular);
