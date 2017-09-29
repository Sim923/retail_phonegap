/**
 * @fileOverview
 * @name profile.messages.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "profile.messages.controller",
    [
      '$log',
      'threads',
      'userService',
      'messageService',
      'profileMessagesService',
      function($log, threads, userService, messageService, profileMessagesService) {
        var oThreads=threads.data;
        var user = userService.model._model;
        var username = userService.model._model.username;
        console.log('oThreads', oThreads);
        console.log('user', user);
        console.log('username', username);
        var $this=this;

        var message = function(username, userId) {
          messageService.addRecipient(username, userId);
        };

        /**
         * init
         */
        var init=function() {
          $log.log('profile.messages.controller.init');
          // profileSidebarService.select('account');

        };
        init();

        angular.extend(this, {
          threads:oThreads,
          username:username,
          message:message,
          user:user
        });
      }
    ]
  );
})(console, angular);
