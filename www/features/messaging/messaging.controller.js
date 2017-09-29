/**
 * @fileOverview message.controller AngularJS Controller for Reeltrail Messaging
 * @name message.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNNLICENSED
 */

(function(console, angular) {
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "message.controller",
    [
      "$injector",
      "$timeout",
      "$window",
      "userService",
      "seller",
      "messageService",
      function($injector, $timeout, $window, userService, seller, messageService) {

        var $cordovaKeyboard = null;
        var isCordova=typeof($window.cordova)==="undefined" ? false : true;
        if (isCordova) {
          $cordovaKeyboard = $injector.get("$cordovaKeyboard");
        }

        var userImage = userService.model.get().profileImage;
        var username = userService.model.get().username;
        var message = {};
        var messages = null;
        var $this=this;

        /**
         * _addRecipient
         * @param {object} oRecipients
         */
        var _addRecipient = function(oRecipients) {
          console.log('_addRecipient');
          messages=oRecipients;
          $this.messages = oRecipients;
        };

        /**
         * _removeRecipient
         * @param {string} recipient
         */
        var _removeRecipient = function(recipient) {
          if ($this.messages) {
            delete $this.messages[recipient];
          }
        };

        /**
         * _receiveMessages
         * @param {object} oMessages
         */
        var _receiveMessages = function(oMessages) {
          $this.messages = oMessages;
          var moveToBottom = function(){
            var height = document.querySelector("#Messaging").scrollHeight+100;
            document.querySelector("#Messaging").scrollTop = height;
          };
          $timeout(moveToBottom, 500);

          $timeout(function() {
            var height = document.querySelector("#Messaging").scrollHeight+100;
            document.querySelector("#Messaging").scrollTop = height;
          }, 500);

        };

        /**
         * emptyList
         * @returns {boolean}
         */
        var emptyList = function() {
          var result = true;
          for (var key in $this.messages) {
            result = false;
            break;
          }
          return result;
        };


        /**
         * sendMessage
         * @param {string} recipient
         */
        var sendMessage = function(recipient) {
          var msg = $this.message[recipient];
          $this.message[recipient] = "";

          messageService.sendMessage(msg, recipient).then(
            function(resp) {
              var thread=resp.data;
              messageService.onIncomingMessage(thread);
            },
            function(resp) {
              console.log(resp);
            }
          );
        };

        /**
         * scope initializer
         */
        var init = function() {
          console.log("message.controller.init");
          messageService.setMessageCallback(_receiveMessages);
          messageService.setAddRecipientCallback(_addRecipient);
          messageService.setRemoveRecipientCallback(_removeRecipient);
          console.log($state.current.name+"----------------xxxx");
        };

        init();

        angular.extend(this, {
          username:username,
          userImage:userImage,
          message:message,
          messages:messages,
          sendMessage:sendMessage,
          emptyList:emptyList
        });
      }
    ]
  );

})(console, angular);
