/**
 * @fileOverview
 * @name profile.support.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'profile.support.controller',
    [
      '$log',
      'user',
      'ZendeskWidget',
      'profileSupportService',
      function($log, user, ZendeskWidget, profileSupportService) {

        var oUser = user.data.status ? angular.copy(user.data) : {username:'GUEST', email:"info@reeltrail.com", _id:"xxxx"};
        var zendesk = function() {
          ZendeskWidget.identify({
            name: oUser.username,
            email: oUser.email,
            externalId: oUser._id
          });
          ZendeskWidget.activate({hideOnClose:true});
        };

        var init = function() {
          $log.log('profile.support.service.init');
        };
        init();

        angular.extend(this, {
          zendesk:zendesk
        });
      }
    ]
  );
})(console, angular);