/**
 * @fileOverview messageService AngularJS Service for Reeltrail Messaging
 * @name message.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    "messageService",
    [
      '$http',
      '$state',
      'rtsocket',
      'userService',
      'profileService',
      'bottomService',
      'baseurlService',
      function($http, $state, rtsocket, userService, profileService, bottomService, baseurlService) {

        var messageService = {};
        var _username = null;
        var _recipient = null;
        var _recipients = {};
        var _messageCallback = null;
        var _recipientCallback = null;
        var _removeRecipientCallback = null;
        var _width = 0;

        var baseUrl = baseurlService.address;

        /**
         * goToMessaging
         * @param {string} username
         * @param {string} userId
         * @param {string} listingId
         */
        messageService.goToMessaging = function(username, userId, listingId) {
          $state.go("messaging", {username:username, userId:userId, listingId:listingId});
        };

        /**
         * reflow
         * @param {string} recipient
         */
        messageService.reflow = function(recipient, replace) {
          _recipients[replace].overflow = true;
          _recipients[recipient].overflow = false;
          _recipientCallback(_recipients);
        };

        /**
         * addRecipient
         * @param {string} rec
         * @param {string} userId
         */
        messageService.addRecipient = function(rec, userId) {
          console.log('messageService.addRecipient ', rec, userId);
          _recipients[rec] = {};
          _recipients[rec].username = rec;
          _recipients[rec].userId = userId;
          _recipients[rec].messages = [];


          if (_recipientCallback) {
            _recipientCallback(_recipients);
          }
        };

        /**
         * removeRecipient
         * @param {string} rec
         */
        messageService.removeRecipient = function(rec) {
          delete _recipients[rec];
          var position = Object.keys(_recipients).length;
          var remaining_width = _width - ((position + 1) * 290);
          var overflow = (remaining_width < 900);
          _recipientCallback(_recipients);
        };

        /**
         * Handle incoming messages
         */
        messageService.onIncomingMessage = function(thread) {
          var _username = userService.model.get().username;
          var _userId = userService.model.get()._id;
          _recipient = "";
          var _recipientId = "";
          for (var i=0; i < thread.participants.length; i++) {
            console.log(_username, thread.participants[i].username);
            if (_username!=thread.participants[i].username) {
              _recipient=thread.participants[i].username;
              _recipientId=thread.participants[i]._id;
            }
          }
          messageService.addRecipient(_recipient, _recipientId);
          _recipients[_recipient].messages = thread.messsages;
          if (_messageCallback) {
            _messageCallback(thread.messages, _recipient);
          }
        };

        /**
         * _send
         * @param {string} senderId
         * @param {string} recipientId
         * @param {string} message
         * @returns {callback}
         */
        messageService._send = function(recipientId, message) {
          return $http({
            url : baseUrl+'/rtapi/v1/messaging',
            method : 'POST',
            data:{
              recipientId:recipientId,
              message:message
            }
          });
        };

        /**
         * get
         * @param {string} threadId
         * @returns {callback} 
         */
        messageService.get = function(threadId) {
          return $http({
            url : baseUrl+'/rtapi/v1/messaging/'+ threadId,
            method : 'GET'
          });
        };

        /**
         * sendMessage
         */
        messageService.sendMessage = function(msg, recipient) {
          console.log("messageService.sendMessage");
          var recipientId = _recipients[recipient].userId;
          return messageService._send(recipientId, msg);
        };

        /**
         * setMessageCallback
         * @param {function} callback -
         */
        messageService.setMessageCallback = function(callback) {
          _messageCallback = callback;
        };

        /**
         * setAddRecipientCallback
         * @param {function} callback
         */
        messageService.setAddRecipientCallback = function(callback) {
          _recipientCallback = callback;
        };

        /**
         * setRemoveRecipientCallback
         * @param {funtion} callback
         */
        messageService.setRemoveRecipientCallback = function(callback) {
          _removeRecipientCallback = callback;
        };

        /**
         * init -- initialize the Reeltrail message service
         */
        messageService.init = function() {
          console.log("message.service.init");
          rtsocket.responders.messages = {
            receive:function(data) {
              console.log(data);
              messageService.onIncomingMessage(data);
            },
            counter:function(data) {
              console.log('messages.count', data);
	      var count = 0;
	      if (typeof(data.count.count)==="undefined") {
		count = data.count;
	      } else {
		count = data.count.count;
	      }
	      profileService.refresh('messagesCount', count);
	      bottomService.refresh('messagesCount', count);
            }
          };
        };

        messageService.init();

        return messageService;
      }
    ]
  );
})(console, angular);
