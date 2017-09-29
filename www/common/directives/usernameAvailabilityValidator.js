/**
 * @fileOverview AngularJs directive to do live username validation
 * @name usernameAvailabilityValidator.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function(angular) {
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.directive("usernameAvailabilityValidator", [
    "$http",
    function($http) {
      return {
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
          var apiUrl = attrs.usernameAvailabilityValidator;

          function setAsLoading(bool) {
            ngModel.$setValidity("usernameLoading", !bool);
          }

          function setAsAvailable(bool) {
            ngModel.$setValidity("usernameAvailable", bool);
          }

          ngModel.$parsers.push(function(value) {
            if (!value || value.length === 0) return;
            setAsLoading(true);
            setAsAvailable(false);
            $http.post(apiUrl, {
              username: value.toLowerCase()
            }).then(
              function() {
                setAsLoading(false);
                setAsAvailable(true);
              },
              function() {
                setAsLoading(false);
                setAsAvailable(false);
              }
            );
            return value;
          });
        }
      };
    }
  ]);
})(angular);