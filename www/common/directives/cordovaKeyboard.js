/**
 * @fileOverview
 * @name cordovaKeyboard.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  var RTMobileApp=angular.module("RTMobileApp");
  RTMobileApp.directive(
    "cordovaKeyboard",
    [
      "$document",
      "$window",
      "$timeout",
      function($document, $window, $timeout) {
        return {
          restrict: "A",
          link: function(scope, element, attrs) {
            var entry = element[0];
            var topNav = document.querySelector("#TopNav"); 
            var bottomNav = document.querySelector("#BottomNav"); 
            var cordovaKeyboardAttrs = attrs.cordovaKeyboard;
            var isCordova=typeof($window.cordova)==="undefined" ? false : true;
            if (isCordova) {
              entry.addEventListener("blur", function(event) {
                return $timeout(function(){
                         if (topNav) {
                           topNav.classList.remove("navbar-fixed-top");
                         }
                         if (bottomNav) {
                           bottomNav.classList.remove("navbar-fixed-bottom");
                         }
                         return $timeout(function(){
                                  if (topNav) {
                                    topNav.classList.add("navbar-fixed-top");
                                  }
                                  if (bottomNav) {
                                    bottomNav.classList.add("navbar-fixed-bottom");
                                  }
                                }, 200);
                       }, 200);
              });
            } else {
              entry.addEventListener("blur", function(event) {
                return $timeout(function(){
                         if (topNav) {
                           topNav.classList.remove("navbar-fixed-top");
                         }
                         if (bottomNav) {
                           bottomNav.classList.remove("navbar-fixed-bottom");
                         }
                         return $timeout(function(){
                                  if (topNav) {
                                    topNav.classList.add("navbar-fixed-top");
                                  }
                                  if (bottomNav) {
                                    bottomNav.classList.add("navbar-fixed-bottom");
                                  }
                                }, 200);
                       }, 200);
              });
            }
          }
        };
      }
    ]
  );
})(console, angular);