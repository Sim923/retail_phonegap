/**
 * @fileOverview
 * @name stepperDirective.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(angular) {
  var RTMobileApp = angular.module('RTMobileApp');
  var rtStepper = function() {
    return {
      restrict: 'AE',
      require: 'ngModel',
      scope: {
        min: '=',
        max: '=',
        ngModel: '=',
        ngDisabled: '='
      },
      template:'<span class="input-group-btn"><button class="btn btn-default" ng-disabled="isOverMin() || ngDisabled" type="button" ng-click="decrement()"><i class="fa fa-minus"></i></button></span>'+
        '<input type="number" class="form-control text-center" ng-model="ngModel" step="1">'+
        '<span class="input-group-btn"><button class="btn btn-default" ng-disabled="isOverMax() || ngDisabled" type="button" ng-click="increment()"><i class="fa fa-plus"></i></button></span>',
      link: function(scope, iElement, iAttrs, ngModelController) {
        scope.label = '';

        if (angular.isDefined(iAttrs.label)) {
          iAttrs.$observe('label', function(value) {
            scope.label = ' ' + value;
            ngModelController.$render();
          });
        }

        ngModelController.$render = function() {
          checkValidity();
        };

        // when model changes, cast to integer
        ngModelController.$formatters.push(function(value) {
          return parseInt(value, 10);
        });

        // when view changes, cast to integer
        ngModelController.$parsers.push(function(value) {
          return parseInt(value, 10);
        });

        function checkValidity() {
          // check if min/max defined to check validity
          var valid = !(scope.isOverMin(true) || scope.isOverMax(true));
          // set model validity
          // the outOfBounds is an arbitrary key for the error.
          // will be used to generate the CSS class names for the errors
          ngModelController.$setValidity('outOfBounds', valid);
        }

        function updateModel(offset) {
          // update the model, call $parsers pipeline...
          ngModelController.$setViewValue(ngModelController.$viewValue + offset);
          // update the local view
          ngModelController.$render();
        }

        scope.isOverMin = function(strict) {
          var offset = strict?0:1;
          return (angular.isDefined(scope.min) && (ngModelController.$viewValue - offset) < parseInt(scope.min, 10));
        };
        scope.isOverMax = function(strict) {
          var offset = strict?0:1;
          return (angular.isDefined(scope.max) && (ngModelController.$viewValue + offset) > parseInt(scope.max, 10));
        };

        // update the value when user clicks the buttons
        scope.increment = function() {
          updateModel(+1);
        };
        scope.decrement = function() {
          updateModel(-1);
        };

        // check validity on start, in case we're directly out of bounds
        checkValidity();

        // watch out min/max and recheck validity when they change
        scope.$watch('min+max', function() {
          checkValidity();
        });
      }
    };
  };
  RTMobileApp.directive('rtStepper', [rtStepper]);

})(angular);