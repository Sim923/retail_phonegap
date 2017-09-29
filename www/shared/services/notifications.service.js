/**
 * @fileOverview
 * @name notifications.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "notificationsService",
    [
      '$http',
      '$location',
      'rtsocket',
      'bottomService',
      'profileService',
      'baseurlService',
      function($http, $location, rtsocket, bottomService, profileService, baseurlService) {

        var baseUrl = baseurlService.address;

        var notificationsService = {};
	notificationsService.count = {};
	notificationsService.count._count = 0;
	notificationsService.count.get = function() {
	  return notificationsService.count._count;
	};
	notificationsService.count.set = function(c) {
	  notificationsService.count._count=c;
	};
	
        /**
         * user
         * @returns {callback}
         */
        notificationsService.user = function() {
          return $http(
            {
              method:'GET',
              url:baseUrl+'/rtapi/v1/notifications/user/'
            }
          );
        };

        /**
         * goToURL
         * @param {string} url
         */
        notificationsService.goTo = function(url) {
          return $location.path(url);
        };

        /**
         * clickNotification
         * @param {object} notification
         * @returns {callback}
         */
        notificationsService.mark = function(id) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/notifications/mark",
            data: {
              notificationId: id
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * unmark
         * @param {string} id
         * @returns {callback}
         */
        notificationsService.unmark = function(id) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/notifications/unmark",
            data: {
              notificationId: id
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * archive
         * @param {object} notification
         * @returns {callback}
         */
        notificationsService.archive = function(id) {
          return $http({
            method: "DELETE",
            url: baseUrl+"/rtapi/v1/notifications",
            data: {
              notificationId:id
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * init the notification service
         */
        notificationsService.init = function() {
          console.log("notificationsService.init");
          rtsocket.responders.notifications = {
            update:function(data) {
              console.log(data);
            },
            counter:function(data) {
              console.log('counter', data);
	      var count = 0;
	      if (typeof(data.count.count)==="undefined") {
		count = data.count;
	      } else {
		count = data.count.count;
	      }
	      notificationsService.count.set(count);
	      profileService.refresh('notificationCount', count);
	      bottomService.refresh('notificationCount', count);
            }
          };
          console.log(rtsocket.responders);
        };
        notificationsService.init();

        return notificationsService;
      }
    ]
  );
})(console, angular);
