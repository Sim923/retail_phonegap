/**
 * @fileOverview browse view controller 
 * @name browse.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'browse.controller',
    [
      '$log',
      '$state',
      'categories',
'topService',
      'browseCategoryService',
      BrowseController
    ]
  );

  /**
   * browseController
   * @param {object} $log
   * @param {object} $state
   * @param {object} categories
   * @param {object} browseCategoryService
   * @returns {object} 
   */
  function BrowseController($log, $state, categories, topService, browseCategoryService) {
    var tabs = {};
    tabs._tabs = [
      {
        title:'Outdoor Gear',
        url:'features/browse/category/browse.category.outdoorgear.html'
      },
      {
        title:'Adventures',
        url:'features/browse/category/browse.category.adventures.html'
      }
    ];

    tabs.get = function() {
      return tabs._tabs;
    };

    var _activeTab = 0;

    /**
     * select
     * @param {number} num
     */
    tabs.select = function(num) {
      tabs.selected = num;
    };

    tabs.data = {};
    tabs.data.outdoorGear = function() {
      console.log('tabs.data.outdoorGear');
      var arr = [];
      for (var i=0; i < categories.data.length; i++) {
        var o = categories.data[i];
        if (o.name==='Adventures') {
          continue;
        } else {
          arr.push(o);
        }
      }
      return arr;
    };

    tabs.data.adventures = function() {
      console.log('tabs.data.adventures');
      var arr = [];
      for (var i=0; i<categories.data.length; i++) {
        var o = categories.data[i];
        if (o.name==='Adventures') {
          arr.push(o);
        } else {
          continue;
        }
      }
      var result = arr[0].subcategories;
      return result;
    };

    /**
     * goTo
     * @param {string} type
     * @param {object} category
     * @param {bool} all
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
     * init
     */
    var init = function() {
      $log.log('browse.controller.init');
      topService.data.set("back", {});
      _activeTab=0;
      console.log($state.current.name);
    };

    /**
     * onActiveTabChanged
     * @param {string} newValue
     */
    var onActiveTabChanged = function(newValue) {
      console.log('onActiveTabChanged');
      if(typeof(newValue)==='undefined') {
        return;
      } 
      browseCategoryService.activeTab=newValue;
      console.log('activeTab', browseCategoryService.activeTab);
    };

    init();

    angular.extend(this, {
      tabs:tabs,
      categories:categories.data,
      goTo:goTo,
      onActiveTabChanged:onActiveTabChanged
    });
  }

  Object.defineProperty(
    BrowseController.prototype,
    "activeTab",
    {
      get: function () {
        return this._activeTab;
      },
      set: function (newValue) {
        console.log('BrowseController.set', newValue);
        this._activeTab = newValue;
        console.log(this);
        this.onActiveTabChanged(newValue);
      },
      enumerable: true,
      configurable: true
    }
  );
})(console, angular);
