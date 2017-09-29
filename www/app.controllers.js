/**
 * @fileOverview Main AngularJS application view controller
 * @name app.controllers.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function () {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'logging.controller',
    [
      '$scope',
      '$log',
      function($scope, $log) {
        $scope.$log = $log;
        $scope.throwError = function() {
          functionThatThrows();
        };

        $scope.throwException = function() {
          throw {
            message: 'error message'
          };
        };

        $scope.throwNestedException = function() {
          functionThrowsNestedExceptions();
        };

        functionThatThrows = function() {
          var x = y;
        };

        functionThrowsNestedExceptions = function() {
          try {
            var a = b;
          } catch (e) {
            try {
              var c = d;
            } catch (ex) {
              $log.error(e, ex);
            }
          }
        };
      }
    ]
  );
})();
