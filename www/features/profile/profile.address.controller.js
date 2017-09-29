/**
 * @fileOverview
 * @name profile.adventures.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'profile.address.controller',
    [
      '$alert',
      '$window',
      '$log',
      'address',
      'addressService',
      'profileAddressService',
      'primary',
      '$state',
      function($alert, $window, $log, address, addressService, profileAddressService, primary, $state) {

        var model ={};

        model.swipe = {};

        /**
         * swipe.left
         * @param {object} address
         */
        model.swipe.left = function(address) {
          address.visible=true;
        };

        /**
         * swipe.right
         * @param {object} address
         */
        model.swipe.right = function(address) {
          address.visible=false;
        };

        model.primaryAddress=primary.data;
        model.address = address.data;
        var $this=this;


        /**
         * edit
         * @param {object} address
         */
        model.edit = function(address) {

          $this.model._id = address._id;
          $this.model.contact = address.contact;
          $this.model.line1 = address.line1;
          $this.model.line2 = address.line2;
          $this.model.city = address.city;
          $this.model.state = address.state;
          $this.model.zipCode = address.zipCode;
          $this.model.country = address.country;
          $this.model.phone = address.phone;
          $this.model.email = address.email;

          profileAddressService.edit.model.set($this.model);
          $state.go('profile.address.edit');
        };

        /**
         * add
         */
        model.add = function() {
          console.log('profile.address.controller.add');
          profileAddressService.edit.model.set({});
          console.log(profileAddressService.edit.model.get());
          $state.go('profile.address.edit');
        };

        /**
         * remove
         * @param {object} address
         */
        model.remove = function(address) {
          console.log(address);
          profileAddressService.model.set(address);
          profileAddressService.delete().then(
            function(resp) {
              profileAddressService.list().then(
                function(resp) {
                  model.address = resp.data;
                },
                function(resp) {
                  console.log(resp); // Problem reading list
                }
              );
            },
            function(resp) {
              console.log(resp, 'Problem removing address');
            }
          );
        };

        /**
         * makePrimary
         */
        model.makePrimary = function() {
          console.log('makePrimary');
          if ($this.model.primaryAddress) {
            console.log($this.model.primaryAddress);
            profileAddressService.setPrimary($this.model.primaryAddress).then(
              function(resp) {
                console.log(resp);
              },
              function(resp) {
                console.log(resp);
              }
            );
          }
        };

        /**
         * setPrimary
         */
        model.setPrimary = function(id) {
          console.log('setPrimary');
          model.primaryAddress._id = id;
          model.makePrimary();
        };

        /**
         * hide
         */
        var hide = function() {
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileAddresses:true};
          alerts.profileFeedback=true;
          $window.localStorage.alerts=JSON.stringify(alerts);
        };

        /**
         * init
         */
        var init = function() {
          $log.log('profile.address.controller.init', address);
          var a = {
            container:"#alerts-container",
            title: '',
            content:'<i class="fa fa-info-circle"></i> Swipe left over any row to show additional actions.',
            placement: 'top',
            type: 'info',
            keyboard: true,
            show: true,
            onHide:hide
          };
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileAddresses:false};
          if (alerts.profileFeedback) {
            console.log('skip alert');
          } else {
            $alert(a);
          }
        };
        init();

        angular.extend(
          this,
          {
            model:model
          }
        );
      }
    ]
  );
})(console, angular);
