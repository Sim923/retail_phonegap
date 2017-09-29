/**
 * @fileOverview AngularJs directive to do live email availability validation
 * @name emailAvailabilityValidator.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function(angular) {
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.directive("emailAvailabilityValidator", [
    "$http",
    function($http) {
      return {
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
          var apiUrl = attrs.emailAvailabilityValidator;

          function setAsLoading(bool) {
            ngModel.$setValidity("emailLoading", !bool);
          }

          function setAsAvailable(bool) {
            ngModel.$setValidity("emailAvailable", bool);
          }

          ngModel.$parsers.push(function(value) {
            if (!value || value.length === 0) return;
            setAsLoading(true);
            setAsAvailable(false);
            $http({
              method: "POST",
              url: apiUrl,
              data: {
                email: value.toLowerCase()
              },
              headers: {
                "Content-Type": "application/json"
              }
            }).then(
              function(data) {
                setAsLoading(false);
                setAsAvailable(true);
              },
              function(err) {
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