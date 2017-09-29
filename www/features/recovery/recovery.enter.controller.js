/**
 * @fileOverview
 * @name recovery.enter.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'recovery.enter.controller',
    [
      'recoveryEnterService',
      function(recoveryEnterService) {

        var email = "";
        var $this=this;

        /**
         * send
         * @param {object} $event
         * @returns {callback} 
         */
        var send = function($event) {
	  console.log($event.$material);
	  if (typeof($event.$material)==="undefined") {
            return recoveryEnterService.forgot($this.email).then(
              function(resp) {
                return recoveryEnterService.next();
              },
              function(resp) {
                console.log(resp);
              }
            );
          }
        };

        /**
         * init
         */
        var init = function() {
          console.log("recovery.enter.controller.init");
        };
        init();

        angular.extend(this, {
          email:email,
          send:send
        });

      }
    ]
  );
})(console, angular);
