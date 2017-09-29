/**
 * @fileOverview
 * @name passwordValidator.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
var RTMobileApp = angular.module('RTMobileApp');
RTMobileApp.directive("passwordValidator", [
  "$http",
  function($http) {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        var apiUrl = attrs.passwordValidator;

        function setAsLoading(bool) {
          ngModel.$setValidity("passwordChecking", !bool);
        }

        function setAsInvalid(bool) {
          ngModel.$setValidity("passwordInvalid", bool);
        }

        ngModel.$parsers.push(function(value) {
          if (!value || value.length === 0) return;
          setAsLoading(true);
          setAsInvalid(false);
          $http(
            {
              method: "POST",
              url: apiUrl,
              data: {
                password: value
              },
              headers: {
                "Content-Type": "application/json"
              }
            }
          ).then(
            function(data) {
              setAsLoading(false);
              setAsInvalid(false);
            },
            function(err) {
              setAsLoading(false);
              setAsInvalid(true);
            }
          );
          return value;
        });
      }
    };
  }
]);
