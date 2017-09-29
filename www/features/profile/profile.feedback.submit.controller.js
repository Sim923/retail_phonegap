/**
 * @fileOverview
 * @name profile.feedback.submit.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "profile.feedback.submit.controller",
    [
      'sale',
      'salesService',
      'user',
      'feedback',
      'feedbackService',
      '$state',
      function(sale, salesService, user, feedback, feedbackService, $state) {
        var oUser = user.data;
        var oSale = sale.status ? sale.data : {soldToUserId:{_id:""}, soldByUserId:{_id:""}};
        var oFeedback = feedback.data;
        var isSender = false;
        var isReceiver = false;
        var error = "";

        var model = {};
        model.value = 0;
        model.comment = "";

        model.ratings = {
          1: "Poor",
          2: "Below Average",
          3: "Average",
          4: "Good",
          5: "Excellent"
        };

        model.currentRating = "Not rated";
        model.hoverRating = 0;
        model.success = false;

        var $this = this;

        /**
         * click1
         */
        var click1 = function() {
          model.value = model.hoverRating;
        };

        /**
         * mouseHover1
         * @param {string} param
         */
        var mouseHover1 = function(param) {
          model.hoverRating = param;
          model.currentRating = model.ratings[param];
        };

        /**
         * mouseLeave1
         */
        var mouseLeave1 = function() {
          model.currentRating = model.ratings[model.value] ? model.ratings[model.value] : "Not Rated";
        };

        /**
         * submit
         * @param {object} object
         */
        var submit = function() {
          $this.model.saleId = oSale._id;
          $this.model.recipientId=recipient();
          if ($this.model.comment.trim()==="") {
            $this.model.comment='NO COMMENT GIVEN';
          }
          feedbackService.model.set($this.model);
          return feedbackService.submit().then(
            function(resp) {
              $this.model.success=true;
              $state.go("profile.feedback");
            },
            function(resp) {
              console.log(resp);
              error=resp.data.message;
            }
          );
        };

        /**
         * disabled
         * @returns {string} 
         */
        var disabled = function() {
          var result = ($this.model.value === 0) || ($this.model.comment.length <= 5);
          return result;
        };

        /**
         * role
         * @returns {string} 
         */
        var recipient = function() {
          var recipientId=null;
          var senderId = oUser._id;
          console.log("oSale", oSale);
          if (oSale.soldToUserId._id==senderId) {
            recipientId=oSale.soldByUserId._id;
          } else {
            recipientId=oSale.soldToUserId._id;
          }
          return recipientId;
        };

        /**
         * hasSent
         * @returns {boolean} 
         */
        var hasSent = function() {
          var result=false;
          var recipientId=recipient();
          for (var i=0; i<oFeedback.length; i++) {
            if (oFeedback[i].senderId._id==oUser._id) {
              result = true;
              break;
            }
          }
          return result;
        };

        /**
         * hasReceived
         * @returns {boolean} 
         */
        var hasReceived = function() {
          var result=false;
          for (var i=0; i<oFeedback.length; i++) {
            if (oFeedback[i].recipientId._id==oUser._id) {
              result = true;
              break;
            }
          }
          return result;
        };

        /**
         * sender
         */
        var sender = function() {
          var result = null;
          for (var i=0; i<oFeedback.length; i++) {
            if (oFeedback[i].senderId._id==oUser._id) {
              result = oFeedback[i];
              break;
            }
          }
          return result;
        };

        /**
         * receiver
         */
        var receiver = function() {
          var result=null;
          for (var i=0; i<oFeedback.length; i++) {
            if (oFeedback[i].recipientId._id==oUser._id) {
              result = oFeedback[i];
              break;
            }
          }
          return result;
        };

        /**
         * init
         */
        var init = function() {
          console.log('feedback.controller.js');
        };

        init();

        angular.extend(this, {
          error:error,
          user:oUser,
          model:model,
          sale:oSale,
          feedback:oFeedback,
          submit:submit,
          disabled:disabled,
          hasSent:hasSent,
          hasReceived:hasReceived,
          receiver:receiver,
          sender:sender,
          click1:click1,
          mouseHover1:mouseHover1,
          mouseLeave1:mouseLeave1
        });
      }
    ]
  );
})(console, angular);