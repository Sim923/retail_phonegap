/**
 * @fileOverview
 * @name alert.service.js
 * @author
 * @license
 */

(function(angular) {
  var RTMobileApp = angular.module("RTMobileApp");
  RTMobileApp.factory(
    "alertService",
    [
      "$http",
      function ($http) {
        var alertText = "";
        var alertType = "";
        var alertService = {};
        var _setAlertText = null;
        var _resetAlertText = null;

        /**
         * setCallback
         * @param {function} callback
         */
        alertService.setCallback = function( callback ) {
          _setAlertText = callback;
        };

        /**
         * setResetCallback
         * @param {function} callback
         */
        alertService.setResetCallback = function( callback ) {
          console.log("alertService.setResetCallback");
          _resetAlertText = callback;
        };

        /**
         * setAlertText
         * @param {string} text
         */
        alertService.setAlertText = function( text, type ) {
          _setAlertText( text, type );
        };

        /**
         * resetAlertText
         * @param {string} text
         */
        alertService.resetAlertText = function() {
          if(_resetAlertText) {
            _resetAlertText( );
          } else {
            console.log("alertService reset callback not defined");
          }
        };

        alertService.errorAlert = function() {
          console.log("Error service");
          var message = "Registration faild!";
          var title = "ALERT";
          var buttonName = "OK";

          navigator.notification.alert(message, alertCallback, title, buttonName);
          
          function alertCallback() {
             console.log("Alert is Dismissed!");
          }
       }

       alertService.successAlert = function() {
        var message = "Successfully registration done";
        var title = "ALERT";
        var buttonName = "OK";
        
        navigator.notification.alert(message, alertCallback, title, buttonName);
        
        function alertCallback() {
           console.log("Alert is Dismissed!");
        }
     }

        return alertService;
      }
    ]
  );
})(angular);
