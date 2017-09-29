/**
 * @fileOverview
 * @name checklist.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "checklist.controller",
    [
      'user',
      'checklistService',
      '$state',
      function (user, checklistService, $state) {
        var u = user.data;
        var dob = typeof(u.dob)==='undefined' ?  false : true;
        var funding = typeof(u.paymentGateways.braintree.merchantAccount)==='undefined' ? false : true;
        var address = typeof(u.primaryAddress)==='undefined' ? false : true;

        console.log(dob, funding, address);

        var checklist = {};
        checklist.address = function() {
          $state.go("profile.address.edit");
        };
        checklist.details = function() {
          $state.go("profile.details");
        };
        checklist.seller = function() {
          $state.go("profile.seller-settings");
        };

        /**
         * init
         */
        var init = function() {
          console.log('checklist.controller.init');
        };

        init();

        angular.extend(
          this,
          {
            dob:dob,
            funding:funding,
            address:address,
            checklist:checklist
          }
        );
      }
    ]
  );

})(console, angular);
