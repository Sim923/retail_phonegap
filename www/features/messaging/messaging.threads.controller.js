/**
 * @fileOverview
 * @name messaging.threads.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    "messaging.threads.controller",
    [
      '$injector',
      '$timeout',
      '$window',
      'user',
      'seller',
      'threads',
      'bottomService',
      'userService',
      'messageService',
      function($injector, $timeout, $window, user, seller, threads, bottomService, userService, messageService) {

        var $cordovaKeyboard = null;
        var isCordova=typeof($window.cordova)==="undefined" ? false : true;
        if (isCordova) {
          $cordovaKeyboard = $injector.get("$cordovaKeyboard");
        }

        var isVisible = true;
				var oThreads=threads.data;
				console.log("threads --- "+JSON.stringify(threads.data));
				var thread=[];
				var oUser = angular.copy(user.data);
				var username = oUser.username;
				var text = "";
				var recipientId = seller.userId ? seller.userId : "";

				var $this=this;

	/**
	 * messages
	 * @param {string} username
	 * @param {string} userId
	 * @param {string} threadId
	 */
	var messages = function(username, userId, threadId) {
          bottomService.visible = false;
          $this.isVisible=false;
	  console.log(username, userId, threadId);
	  $this.recipientId=userId;
	  messageService.addRecipient(username, userId);

	  messageService.get(threadId).then(
	    function(resp) {
	      _receiveMessages(resp.data.messages);
	    },
	    function(resp) {
              console.log(resp);
	      _receiveMessages({messages:[]}); // Assume no messages
	    }
	  );
	};

	/**
	 * send message
	 */
	var send = function() {
	  messageService._send($this.recipientId, $this.text).then(
	    function(resp) {
	      $this.text="";
              _receiveMessages(resp.data.messages);
	    },
	    function(resp) {
              console.log(resp);
	    }
	  );
	};

	/**
	 * _receiveMessages
	 * @param {object} oMessages
	 */
	var _receiveMessages = function(oMessages) {
          $this.thread = oMessages;
	  var moveToBottom = function() {
            window.scrollTo(0, document.body.scrollHeight);
	  };
          $timeout(moveToBottom, 100);
          $timeout(function() {
            window.scrollTo(0, document.body.scrollHeight);
          }, 100);
	};

	
	/**
	 * init
	 */
	var init = function() {
	  console.log('messaging.threads.controller.init');
	  messageService.setMessageCallback(_receiveMessages);
	};

	init();

	angular.extend(this, {
          isVisible:isVisible,
	  recipientId:recipientId,
	  threads:oThreads,
	  thread:thread,
	  username:username,
	  messages:messages,
	  text:text,
	  send:send
	});
      }
    ]
  );
})(console, angular);
