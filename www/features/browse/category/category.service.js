/**
 * @fileOverview item detail service
 * @name category.service.js
 * @author Matthew Aaron Raymer (matthew.raymer@anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'browseCategoryService',
    [
      '$log',
      '$http',
      'itemService',
      'adventureService',
      'categoryService',
      'baseurlService',
      function($log, $http, itemService, adventureService, categoryService, baseurlService) {
        var browseCategoryService = {};
        var baseUrl = baseurlService.address;
        browseCategoryService.selected = {};
        browseCategoryService.selected._selected = {main:'', sub:'', subsub:''};
        browseCategoryService.activeTab="Outdoor Gear";
        browseCategoryService.type="Listing";
        browseCategoryService.all=false;
        browseCategoryService.start=0;
        browseCategoryService.rows=12;

        /**
         * update
         * @returns {callback} 
         */
        browseCategoryService.update=function(sort) {
          console.log('update', sort, browseCategoryService);
          var idLvl0 = browseCategoryService.selected.get().main==='' ? '' : browseCategoryService.selected.get().main._id;
          var idLvl1 = browseCategoryService.selected.get().sub==='' ? '' : browseCategoryService.selected.get().sub._id;
          var idLvl2 = browseCategoryService.selected.get().subsub==='' ? '' : browseCategoryService.selected.get().subsub._id;
          switch (browseCategoryService.type) {
            case "Listing":
            if (browseCategoryService.all) {
              console.log('browseCategoryService.all');
              return itemService.list.fetch.all(browseCategoryService.start, browseCategoryService.rows, sort).then(
		function(resp) {
                  browseCategoryService.selected.set('', '', '');
		  return {status:true, data:resp.data.data};
		},
		function(resp) {
		  return {status:false};
		}
              );
            } else {
              console.log('browseCategoryService.fetch', idLvl0, idLvl1, idLvl2);
	      return categoryService.listing.fetch(idLvl0, idLvl1, idLvl2, browseCategoryService.start, browseCategoryService.rows, sort).then(
		function(resp) {
                  browseCategoryService.selected.set(idLvl0, idLvl1, idLvl2);
		  return {status:true, data:resp.data.data};
		},
		function(resp) {
		  return {status:false};
		}
              );
            }
            break;
            case "Adventure":
            if (browseCategoryService.all) {
              return adventureService.list.fetch.all(browseCategoryService.start, browseCategoryService.rows, sort).then(
		function(resp) {
                  browseCategoryService.selected.set('', '', '');
		  return {status:true, data:resp.data.data};
		},
		function(resp) {
		  return {status:false};
		}
              );
            } else {
              idLvl0=categoryService.categories._categories[5]._id;
              console.log(idLvl0, idLvl1, idLvl2);
	      return categoryService.listing.fetch(idLvl0, idLvl1, idLvl2, browseCategoryService.start, browseCategoryService.rows, sort).then(
		function(resp) {
                  browseCategoryService.selected.set(idLvl0, idLvl1, idLvl2);
		  return {status:true, data:resp.data.data};
		},
		function(resp) {
		  return {status:false};
		}
              );
            }
            break;
          }
        };

        /**
         * fetch
         * @param {number} start
         * @param {number} rows
         * @returns {callback}
         */
        browseCategoryService.fetch = function(start, rows) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listings/search/category",
            data : {
              categoryId:browseCategoryService.selected.lowest(),
              start:start,
              rows:rows
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * all
         * @param {number} start
         * @param {number} rows
         * @param {string} type
         * @returns {callback}
         */
        browseCategoryService.all = function(start, rows, type) {
          browseCategoryService.fetch = function(start, rows) {
            return $http({
              method: "POST",
              url: baseUrl+"/rtapi/v1/listings/search/all",
              data : {
                start:start,
                rows:rows,
                type:type
              },
              headers: {
                "Content-Type": "application/json"
              }
            });
          };
        };

        /**
         * selected.set
         * @param {string} l0
         * @param {string} l1
         * @param {string} l2
         */
        browseCategoryService.selected.set = function(l0, l1, l2) {
          $log.log('browseCategoryService.selected.set');
          if (typeof(l0)==='string') {
            browseCategoryService.selected._selected.main = categoryService.categories.find(l0);
          } else {
            browseCategoryService.selected._selected.main = l0;
          }
          if (typeof(l1)==='string') {
            browseCategoryService.selected._selected.sub = categoryService.categories.find(l1);
          } else {
            browseCategoryService.selected._selected.sub = l1;
          }
          if (typeof(l2)==='string') {
            browseCategoryService.selected._selected.subsub = categoryService.categories.find(l2);
          } else {
            browseCategoryService.selected._selected.subsub = l2;
          }
        };

        /**
         * selected.get
         * @returns {object}
         */
        browseCategoryService.selected.get = function() {
          return browseCategoryService.selected._selected;
        };

        /**
         * selected.lowest
         * @returns {callback}
         */
        browseCategoryService.selected.lowest = function() {
          var lowest = '';
          if (browse.category.selected._selected.main) {
            lowest = browseCategorySelected._selected.main;
          }
          if (browse.category.selected._selected.sub) {
            lowest = browseCategorySelected._selected.sub;
          }
          if (browse.category.selected._selected.subsub) {
            lowest = browseCategorySelected._selected.subsub;
          }
          return lowest;
        };

        return browseCategoryService;
      }
    ]
  );
})(console, angular);
