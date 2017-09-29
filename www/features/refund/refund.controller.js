/**
 * @fileOverview
 * @name refund.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'refunds.controller',
    [
      'user',
      'sale',
      'refund',
      '$timeout',
      'refundsService',
      function (user, sale, refund, $timeout, refundsService) {
        var oUser=angular.copy(user.data);
        console.log('oUser', oUser);
        var userId=oUser._id;
        var refundObject = {};
        var oSale = angular.copy(sale.data);
        var saleId = oSale._id;
        var sentRefundObject = (refund.status===false) ? {comments:[]} : angular.copy(refund.data);
        var request = refund.request;
        var comment = "";
        var amount = 0;
        var _refunds = refund.data.status ? refund.data.refunds : [];

        var $this=this;

        /**
         * total
         * @returns {number} 
         */
        var total = function() {
          var result = oSale.total * oSale.quantity;
          result += oSale.taxes * oSale.quantity;
          result += oSale.trackingNumbers.length === 0 ? (oSale.listingId.flatShippingRate * oSale.quantity) : 0;
          return result;
        };

        /**
         * isSeller
         * @returns {boolean}
         */
        var isSeller = function() {
          return (userId==oSale.soldByUserId._id);
        };

        /**
         * _callback
         * @param {object} data
         */
        var _callback = function(data) {
          $this.sentRefundObject = data;
          _refunds=data.refunds;
          $this.request=false;
          var moveToBottom = function(){
            var height = document.querySelector(".messaging-conversation").scrollHeight+100;
            document.querySelector(".messaging-conversation").scrollTop = height;
          };
          $timeout(moveToBottom, 500);

          $timeout(function() {
            var height = document.querySelector(".messaging-conversation").scrollHeight+100;
            document.querySelector(".messaging-conversation").scrollTop = height;
          }, 500);
        };

        /**
         * sentRefundObjectChanged
         */
        var sentRefundObjectChanged = function () {
          $timeout(function() {
            var height = document.querySelector(".messaging-conversation").scrollHeight+100;
            document.querySelector(".messaging-conversation").scrollTop = height;
          }, 500);
        };

        /**
         * submitRefundRequest
         * @param {string} id
         * @param {string} Reason
         */
        var submitRefundRequest = function( id, Reason ) {
          refundsService.submitRefundRequest( id, Reason ).then(
            function ( resp ) {
              console.log(resp.data);
              $this.request=false;
              var message = resp.data.message;
            },
            function( resp ) {
              console.log(resp);
            }
          );
        };

        /**
         * sendComment
         * @param {string} id
         * @param {string} Reason
         */
        var sendComment = function( id, Reason ) {
          refundsService.sendComment(id, Reason).then(
            function(resp) {
              $this.comment = "";
            },
            function(resp) {
              console.log(resp);
            }
          );
        };

        /**
         * acceptRefund
         * @param {string} id
         */
        var acceptRefund = function(id,amount) {
          refundsService.acceptRefund(id, amount).then(
            function(resp){
              console.log(resp);
            },
            function(resp) {
              console.log(resp);
            }
          );
        };

        /**
         * rejectRefund
         * @param {string} id
         */
        var rejectRefund = function(id) {
          refundsService.rejectRefund(id).then(
            function(resp){
              console.log(resp);
            },
            function(resp) {
              console.log(resp);
            }
          );
        };

        /**
         * dateAccepted
         * @returns {date} 
         */
        var dateAccepted = function() {
          var date = null;
          for (var i=0; i < _refunds.length; i++) {
            var refund = _refunds[i];
            if (refund.status==="ACCEPTED") {
              date = refund.requested;
            }
          }
          return date;
        };


        /**
         * dateRejected
         * @returns {date} 
         */
        var dateRejected = function() {
          var date = null;
          for (var i=0; i < _refunds.length; i++) {
            var refund = _refunds[i];
            if (refund.status==="REJECTED") {
              date = refund.requested;
            }
          }
          return date;
        };

        /**
         * accepted
         * @returns {boolean} 
         */
        var accepted = function() {
          var accepted = false;
          for (var i=0; i < _refunds.length; i++) {
            accepted |= (_refunds[i].status==="ACCEPTED");
          }
          return accepted;
        };

        /**
         * rejected
         * @returns {boolean} 
         */
        var rejected = function() {
          var rejected = false;
          for (var i=0; i < _refunds.length; i++) {
            rejected |= (_refunds[i].status==="REJECTED");
          }
          return rejected;
        };

        /**
         * init
         */
        var init = function() {
          console.log('refundCtrl.init');
          var moveToBottom = function(){
            var height = angular.element(document.querySelector(".messaging-conversation"))[0].scrollHeight+100;
            console.log(angular.element(document.querySelector(".messaging-conversation"))[0]);
            angular.element(document.querySelector(".messaging-conversation"))[0].scrollTop=height;
          };
          $timeout(moveToBottom, 500);
          refundsService.controller.callback.set(_callback);
        };

        init();

        angular.extend(this, {
          isSeller:isSeller,
          userId:userId,
          refundObject:refundObject,
          saleId:saleId,
          oSale:oSale,
          sentRefundObject:sentRefundObject,
          request:request,
          comment:comment,
          amount:amount,
          accepted:accepted,
          rejected:rejected,
          dateAccepted:dateAccepted,
          dateRejected:dateRejected,
          submitRefundRequest:submitRefundRequest,
          sendComment:sendComment,
          acceptRefund:acceptRefund,
          rejectRefund:rejectRefund
        });
      }
    ]
  );
})(console, angular);
