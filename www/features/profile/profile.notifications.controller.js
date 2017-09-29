/**
 * @fileOverview
 * @name profile.notifications.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "profile.notifications.controller",
    [
      '$alert',
      '$window',
      'notifications',
      'profileNotificationsService',
      '$state',
      function($alert, $window, notifications, profileNotificationsService, $state) {
        var items = notifications.data;
        var visible=false;
        var model ={};

        model.swipe = {};

        model.swipe.left = function(notification) {
          notification.visible=true;
        };

        model.swipe.right = function(notification) {
          notification.visible=false;
        };

        var selectedFilter = {};
        var filter = [
          {
            id : "",
            text : "All Notifications",
            notification : "You have no notification yet."
          },{
            id : "send",
            text : "Send feedback",
            notification : "You have no feedback yet."
          }, {
            id : "accepted your offer",
            text : "A seller has accepted your offer",
            notification : "You have no seller has accepted your offer yet."
          }, {
            id : "received an offer",
            text : "You have received an offer",
            notification : "You have no offer yet."
          }, {
            id : "sold",
            text : "You sold an item",
            notification : "You have no sales yet."
          }
        ];

        /**
         * goTo
         * @param {object} notification
         */
        var goTo = function(notification)  {
    console.log(notification);
          var id = notification._id;
          profileNotificationsService.mark(id).then(
            function(resp) {
              console.log('goTo resp: ', resp.data);
              var n = resp.data;
              var res = n.url.split("/");
              var state = res[1];
              if(state === "feedback") {
                state = "profile.feedback.submit";
              }
              if(state === "offers") {
                state = "home.offer";
              }
              if(state === "shipping") {
                state = "profile.shipping.submit";
              }
              if(state === "refund") {
                state = "profile.refund";
              }
              notification.isRead=n.isRead;
              console.log(res, state);
              $state.go(state, {id:res[2]});
            },
            function(resp) {
            }
          );
        };

        /**
         * mark
         * @param {object} notification
         */
        var mark = function(notification) {
          var id = notification._id;
          profileNotificationsService.mark(id).then(
            function(resp) {
              var n = resp.data;
              notification.isRead=n.isRead;
            },
            function(resp) {
            }
          );
        };


        /**
         * unmark
         * @param {object} notification
         */
        var unmark = function(notification) {
          var id = notification._id;
          profileNotificationsService.unmark(id).then(
            function(resp) {
              var n = resp.data;
              notification.isRead=n.isRead;
            },
            function(resp) {
            }
          );
        };

        /**
         * archive
         * @param {object} notification
         */
        var archive = function(notification) {
          var id=notification._id;
          profileNotificationsService.archive(id).then(
            function(resp) {
              console.log(resp.data);
              $state.reload();
            },
            function(resp) {
              console.log(resp);
            }
          );
        };

        /**
         * hide
         */
        var hide = function() {
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileNotifications:true};
          alerts.profileNotifications=true;
          $window.localStorage.alerts=JSON.stringify(alerts);
        };

        /**
         * init
         */
        var init = function() {
          console.log('profile.notifications.controller');
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
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileNotifications:false};
          if (alerts.profileNotifications) {
            console.log('skip alert');
          } else {
            $alert(a);
          }

          selectedFilter = {
            id : "",
            text : "All notifications",
            notification : "You have no notification yet."
          };
        };

        init();

        angular.extend(
          this, {
            model:model,
            visible:visible,
            selectedFilter:selectedFilter,
            filter:filter,
            notifications:items,
            archive:archive,
            mark:mark,
            unmark:unmark,
            goTo:goTo
          }
        );
      }
    ]
  );
})(console, angular);
