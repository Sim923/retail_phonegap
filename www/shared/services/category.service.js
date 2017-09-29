/**
 * @fileOverview Main AngularJS Application Services for Reeltrail application
 * @name category.services.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'categoryService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http, baseurlService) {

        var categoryService = {};
        categoryService.categories = {};
        categoryService.categories._categories = [];
        categoryService.categories._lookup = {};
        var baseUrl = baseurlService.address;
        /**
         * categories.fetch
         * @returns {callback}
         */
        categoryService.categories.fetch = function() {
          return $http({
            method: 'GET',
            url: baseUrl+'/rtapi/v1/resources/categories'
          });
        };

        /**
         * categories.load
         */
        categoryService.categories.load = function() {
          categoryService.category.fetch().then(
            function(resp) {
              categoryService.categories.set(resp.data);
            },
            function(resp) {
              console.dir(resp.data);
            }
          );
        };

        /**
         * categories.set
         * @param {array} categories
         */
        categoryService.categories.set = function(categories) {
          categoryService.categories._categories = categories;

          for (var i=0; i<categories.length; i++) {
            var o=categories[i];
            categoryService.categories._lookup[o._id] = o;
            for (var j=0; j<o.subcategories.length; j++) {
              var p=o.subcategories[j];
              categoryService.categories._lookup[p._id] = p;
              for (var k=0; k<p.subcategories.length; k++) {
                var q=p.subcategories[k];
                categoryService.categories._lookup[q._id] = q;
              }
            }

          }
          console.log(categoryService.categories._lookup);
        };

        /**
         * categories.get
         * @returns {array}
         */
        categoryService.categories.get = function() {
          return categoryService.categories._categories;
        };

        /**
         * lookup
         * @param {string} id
         * @param {array} cats
         * @returns {number}
         */
        categoryService.categories.lookup = function(id, cats) {
          var idx = -1;
          if (cats) {
            for (var i=0; i < cats.length; i++) {
              if (cats[i]._id==id) {
                idx = i;
                break;
              } else {
                if (cats[i].subcategories) {
                  idx = categoryService.categories.lookup(id, cats[i].subcategories);
                }
                if (idx > -1) break;
              }
            }
          }
          return idx;
        };

        /**
         * find
         * @param {string} id
         * @param {array} cats
         * @returns {object}
         */
        var find = function(id, cats) {
          if (id==='') {
            return '';
          }
          var c = categoryService.categories._lookup[id];
          return c;
        };

        /**
         * categories.find
         * @param {string} id
         * @returns {object}
         */
        categoryService.categories.find = function(id) {
          return find(id);
        };

        /**
         * select
         * @param {number} l0
         * @param {number} l1
         * @param {number} l2
         * @returns {object}
         */
        categoryService.categories.select = function(l0, l1, l2) {
          var idx0 = typeof(l0)==='undefined' ? -1 : parseInt(l0);
          var idx1 = typeof(l1)==='undefined' ? -1 : parseInt(l1);
          var idx2 = typeof(l2)==='undefined' ? -1 : parseInt(l2);
          console.log(l0, l1, l2);
          console.log(idx0, idx1, idx2);
          var oCategory = {};
          if (idx0 > -1) oCategory.main=categoryService.categories._categories[idx0].name;
          if (idx1 > -1) oCategory.sub=categoryService.categories._categories[idx0].subcategories[idx1].name;
          if (idx2 > -1) oCategory.subsub=categoryService.categories._categories[idx0].subcategories[idx1].subcategories[idx2].name;
          return oCategory;
        };

        /**
         * id
         * @param {number} l0
         * @param {number} l1
         * @param {number} l2
         * @returns {object}
         */
        categoryService.categories.id = function(l0, l1, l2) {
          var idx0 = typeof(l0)==='undefined' ? -1 : parseInt(l0);
          var idx1 = typeof(l1)==='undefined' ? -1 : parseInt(l1);
          var idx2 = typeof(l2)==='undefined' ? -1 : parseInt(l2);
          var oCategory = {};
          if (idx0 > -1) oCategory.main=categoryService.categories._categories[idx0]._id;
          if (idx1 > -1) oCategory.sub=categoryService.categories._categories[idx0].subcategories[idx1]._id;
          if (idx2 > -1) oCategory.subsub=categoryService.categories._categories[idx0].subcategories[idx1].subcategories[idx2]._id;
          return oCategory;
        };

        categoryService.listing = {};

        /**
         * listing.fetch
         * @param {string} mainCategoryId
         * @param {string} subCategoryId
         * @param {string} subSubCategoryId
         * @returns {callback}
         */
        categoryService.listing.fetch = function(mainCategoryId, subCategoryId, subSubCategoryId, start, row, sort) {
          console.log('categoryService.listing.fetch', sort);
          return $http({
            method: 'POST',
            data:{
              mainCategoryId:mainCategoryId,
              subCategoryId:subCategoryId,
              subSubCategoryId:subSubCategoryId,
              start:0,
              rows:10,
              sort:sort
            },
            url: baseUrl+'/rtapi/v1/categories/search'
          });
        };

        /**
         * init
         */
        categoryService.init = function() {
          $log.log('categoryService.init');
        };
        categoryService.init();

        return categoryService;
      }
    ]
  );
})(console, angular);
