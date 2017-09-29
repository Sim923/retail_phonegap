/**
 * @fileOverview
 * @name profile.feedback.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "profile.feedback.controller",
    [
      '$alert',
      '$window',
      'user',
      'profileFeedbackService',
      'feedback',
      'feedbackService',
      function ProfileFeedbackController($alert, $window, user, profileFeedbackService, feedback, feedbackService) {

	var oUser=user.data;
        var items=feedback.data;

	var $this=this;

        /**
         * filterRecipient
         * @param {array} items
         * @returns {} 
         */
        var filterRecipient = function(items) {
	  var result = [];
	  for (var i=0; i<items.length; i++) {
	    var item=items[i];
            if (item.recipientId._id==oUser._id) {
	      result.push(item);
	    }
	  }
          return result;
        };

        /**
         * hide
         */
        var hide = function() {
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileFeedback:true};
          alerts.profileFeedback=true;
          $window.localStorage.alerts=JSON.stringify(alerts);
        };
	
        /**
         * init
         */
        var init = function() {
          console.log('profile.feedback.controller.init');
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
          var alerts = $window.localStorage.alerts ? JSON.parse($window.localStorage.alerts) : {profileFeedback:false};
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
	    user:oUser,
            feedback:items,
	    filterRecipient:filterRecipient
          }
        );
      }
    ]
  );
})(console, angular);
