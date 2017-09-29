/**
 * @fileOverview
 * @name profile.sellersettings.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "profile.seller.settings.controller",
    [
      'account',
      'user',
      'profileSellerSettingsService',
      '$state',
      function(account, user, profileSellerSettingsService, $state) {

        var _account=typeof(account)==='undefined'? {type:"bank", routingNumber:"", accountNumberLast4:"", status:""} : account.data;

        var _user=user.data;
        var isEdittingAccount = account.status===false;
        var isProcessing = false;
        var enableButtons = false;

        var model = profileSellerSettingsService.model.get();

        model.funding.routingNumber=_account.routingNumber;
        model.funding.accountNumberLast4=_account.accountNumberLast4;
        model.funding.status=_account.status;
        model.funding.type=_account.type;

        model.taxify = _user.settings.taxify;

        profileSellerSettingsService.model.set(model);

        var error = '';

        var hasMerchantAccount = typeof(_user.paymentGateways.braintree.merchantAccount)==="undefined" ? false : true;
        var $this = this;

        /**
         * ready
         * @returns {boolean}
         */
        var ready = function() {
          return ( typeof(_user.dob)==='undefined' ? false : true ) && (typeof(_user.primaryAddress)==='undefined' ? false : true) ;
        };

        var funding = {};

        /**
         * funding.cancel
         */
        funding.cancel = function() {
          $this.isEdittingAccount=false;
        };

        /**
         * funding.edit
         */
        funding.edit = function() {
          $this.isEdittingAccount = true;
        };

        /**
         * funding.save
         */
        funding.save = function() {
          $this.isProcessing = true;
          console.log(isProcessing);
          profileSellerSettingsService.model.set(model);
          profileSellerSettingsService.funding.save().then(
            function(resp) {
              console.log(resp);
                $this.model.funding.status=resp.data.status;
                $this.isProcessing = false;
                $this.isEdittingAccount=false;
                $state.go("profile");
            },
            function(resp) {
              $this.isProcessing = false;
              $this.error="";
               console.log(resp);
               if (resp.status===400) {
                 for (var i=0; i<resp.data.length; i++) {
                   $this.error+=resp.data[i].message;
                 }
               } else {
                 $this.error=resp.data.message;
               }
            }
          );
        };

        var taxify = {};

        /**
         * taxify.save
         */
        taxify.save = function() {
          profileSellerSettingsService.model.set(model);
          profileSellerSettingsService.taxify.save().then(
            function(resp) {
              console.log(resp);
            },
            function(resp) {
            }
          );
        };

        /**
         * init
         */
        var init = function() {
          console.log('profile.sellersettings.controller');
        };

        init();

        angular.extend(
          this,
          {
            model:model,
            ready:ready,
            isEdittingAccount:isEdittingAccount,
            hasMerchantAccount:hasMerchantAccount,
            funding:funding,
            taxify:taxify,
            isProcessing:isProcessing,
            enableButtons:enableButtons,
            error:error
          }
        );
      }
    ]
  );
})(console, angular);
