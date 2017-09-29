/**
 * @fileOverview register view controller 
 * @name register.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'register.controller',
    [
      '$log',
      '$state',
      '$timeout',
      'registerService',
      function($log, $state, $timeout, registerService) {
        var model = registerService.model.get();
        var years = [];
        var visibleYears = function() {
          var years = [];
          var top = new Date().getFullYear() - 12;
          var bottom = top - 100;
          for (var i=top; i > bottom; i--) {
            years.push({value:i, text:i});
          }
          return years;
        };
        years = visibleYears();
        var months=[
          {value:'01', text:'January'}, {value:'02', text:'February'}, {value:'03', text:'March'}, {value:'04', text:'April'}, {value:'05', text:'May'}, {value:'06', text:'June'},
          {value:'07', text:'July'}, {value:'08', text:'August'}, {value:'09', text:'September'}, {value:'10', text:'October'}, {value:'11', text:'November'}, {value:'12', text:'December'}
        ];
        var days=[];

        var updateDays = function(nv) {
          var getDaysInMonth=(
            function() {
              return function(month, year){
                return new Date(year, month, 0).getDate();
              };
            }
          )();
          var visibleDays=function() {
            days.splice(0, days.length);
            var month=parseInt(nv);
            var year=parseInt(model.yearOfBirth.value);
            var top=getDaysInMonth(month, year);
            for (var i=1; i<=top; i++) {
              var str = "" + i;
              var pad = "00";
              var ans = pad.substring(0, pad.length - str.length) + str;
              days.push({value:ans, text:ans});
            }
          };
          visibleDays();
        };

        /**
         * next
         */
        var next = function() {
          model.contact = model.firstName + " " + model.lastName;
          model.address._address.contact = model.contact;
          model.address._address.email = model.email;
          registerService.model.set(model);
          $state.go('register.step2');
        };

        /**
         * init
         */
        var init = function() {
          $log.log('register.controller.init');
        };
        init();

        angular.extend(this, {
          model:model,
          next:next,
          updateDays:updateDays,
          years:years,
          months:months,
          days:days
        });
      }
    ]
  );
})(console, angular);
