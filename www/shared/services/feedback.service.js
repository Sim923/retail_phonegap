/**
 * @fileOverview
 * @name profile.details.service.js
 * @author
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'feedbackService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http, baseurlService) {
        var feedbackService = {};

        var average = 0;

        feedbackService.model = {};
        feedbackService.model._model = {};

        var baseUrl = baseurlService.address;

        /**
         * model.get
         * @returns {object} 
         */
        feedbackService.model.get = function() {
          return angular.copy(feedbackService.model._model);
        };

        /**
         * model.set
         * @param {object} model
         */
        feedbackService.model.set = function(model) {
          feedbackService.model._model=angular.copy(model);
        };


        /**
         * user
         * @returns {callback} 
         */
        feedbackService.user = function() {
          return $http(
            {
              method:'GET',
              url:baseUrl+'/rtapi/v1/feedback/user/'
            }
          );
        };

        /**
         * feedback
         * @param {string} id
         * @returns {callback} 
         */
        feedbackService.sale = function(id) {
          return $http(
            {
              method:'GET',
              url:baseUrl+'/rtapi/v1/feedback/sale/'+id
            }
          );
        };

        /**
         * submit
         * @returns {callback}
         */
        feedbackService.submit = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/feedback",
            data: feedbackService.model.get(),
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        feedbackService.listing = {};

        feedbackService.listing.fetch = function(id){
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/listings/view/" + id,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * average
         * @param {string} username
         * @returns {callback} 
         */
        feedbackService.average = function(username) {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/feedback/average/" + username,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };
        /**
         * init
         */
        feedbackService.init = function() {
          console.log('feedback.service.init');
        };

        feedbackService.init();

        return feedbackService;
      }
    ]
  );
})(console, angular);
