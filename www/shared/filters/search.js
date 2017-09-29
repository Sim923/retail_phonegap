/**
 * @fileOverview
 * @name search.js
 * @author 
 * @license 
 */
(function(console, angular) {
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.filter("search", function() {
    return function(item, model) {
      console.log('item', item);
      var result = false;
      if (item.type===model.type) result = true;
      return result;
    };
  });
})(console, angular);
