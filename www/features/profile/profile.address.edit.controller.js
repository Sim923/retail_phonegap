/**
 * @fileOverview
 * @name profile.adventures.edit.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'profile.address.edit.controller',
    [
      '$state',
      '$log',
      'countries',
      'userService',
      'addressService',
      'profileAddressService',
      function($state, $log, countries, userService, addressService, profileAddressService) {

        var model = profileAddressService.edit.model.get();
        console.log(model._id, userService.model.get().primaryAddress._id);
        if (model._id==userService.model.get().primaryAddress._id) {
          model.isPrimary=true;
        }
        var $this=this;

        /**
         * cancel
         */
        var cancel = function() {
          $state.go('profile.address');
        };

        /**
         * save
         */
        var save = function() {
          profileAddressService.edit.model.set($this.model);
          profileAddressService.validate().then(
            function(resp) {
              $this.model.shippoId = resp.data.address.address.shippoId;
              profileAddressService.edit.model.set($this.model);
              profileAddressService.save().then(
                function(resp) {
                  console.log(resp);
                  $state.go('profile.address', {}, {reload:true});
                },
                function(resp) {
                  console.log(resp);
                }
              );
            },
            function(resp) {
              console.log(resp);
            }
          );
        };

        /**
         * init
         */
        var init = function() {
          $log.log('profile.address.edit.controller.init');
        };
        init();

        angular.extend(
          this,
          {
            model:model,
            countries:countries.data,
            cancel:cancel,
            save:save
          }
        );
      }
    ]
  );
})(console, angular);
