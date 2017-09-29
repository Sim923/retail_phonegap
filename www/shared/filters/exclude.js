/**
 * @fileOverview
 * @name exclude.js
 * @author 
 * @license 
 */
(function(angular) {
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.filter('exclude', function() {
    return function(input, exclude, prop) {
      if (!angular.isArray(input)) {
        return input;
      }
      if (!angular.isArray(exclude)) {
        exclude = [];
      }
      if (prop) {
        exclude = exclude.map(function byProp(item) {
          return item[prop];
        });
      }

      return input.filter(function byExclude(item) {
        return exclude.indexOf(prop ? item[prop] : item) === -1;
      });
    };
  });
})(angular);