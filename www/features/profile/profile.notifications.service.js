/**
 * @fileOverview
 * @name profile.notifications.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "profileNotificationsService",
    [
      'notificationsService',
      function(notificationsService) {
        var profileNotificationsService = {};

        /**
         * archive
         * @param {string} url
         */
        profileNotificationsService.archive = function(id) {
          return notificationsService.archive(id);
        };

        /**
         * mark
         * @param {string} id
         * @returns {callback}
         */
        profileNotificationsService.mark = function(id) {
          return notificationsService.mark(id);
        };

        /**
         * unmark
         * @param {string} id
         * @returns {callback}
         */
        profileNotificationsService.unmark = function(id) {
          return notificationsService.unmark(id);
        };

        /**
         * goTo
         * @param {string} url
         * @returns {callback}
         */
        profileNotificationsService.goTo = function(url) {
          return notificationsService.goTo(url);
        };

        /**
         * init
         */
        profileNotificationsService.init = function() {
          console.log('profile.notifications.service');
        };

        profileNotificationsService.init();

        return profileNotificationsService;
      }
    ]
  );
})(console, angular);
