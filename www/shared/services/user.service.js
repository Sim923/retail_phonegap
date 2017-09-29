/**
 * @fileOverview AngularJS Application Service the user logged into the Reeltrail application
 * @name user.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.service(
    'userService',
      [
	  '$window',
      '$log',
      '$http',
      'rtsocket',
      'paymentGatewayService',
      'notificationsService',
      'navService',
      'bottomService',
      'topService',
      'profileService',
      'refundsService',
      'baseurlService',
	  function($window, $log, $http, rtsocket, paymentGatewayService, notificationsService, navService, bottomService, topService, profileService, refundsService, baseurlService) {

	      
        var userService = {};
        var baseUrl = baseurlService.address;
        userService.data = {};
        userService.data._data = {};
        userService.data._data.username = "";
        userService.data._data.firstName = "";
        userService.data._data.lastName = "";
        userService.data._data.email = "";

        userService.model = {};

        var fields = [
          {name:'username', value:''},
          {name:'_id', value:''},
          {name:'firstName', value:''},
          {name:'lastName', value:''},
          {name:'email', value:''},
          {name:'images', value:[]},
          {name:'profileImage', value:''},
          {name:'primaryAddress', value:{}},
          {name:'settings', value:{taxify:{apiKey:""}}},
          {name:'feedbackAverage', value:''},
          {name:'addresses', value:[]},
          {name:'paymentGateways', value: {braintree : { merchantAccount:"", paymentMethods: [], planId: ""} }},
          {name:'isConfirmed', value:false},
          {name:'isActive', value:false},
          {name:'profileImage', value:'img/defaultImage.png'},
          {name:'dob', value:{day:'', month:'', year:''}},
          {name:'companyName', value:''},
          {name:'entityType', value:'individual'},
          {name:'subscription', value:{name:'Bronze'}}
         ];

        /**
         * defaults
         */
        userService.defaults = function() {
          for (var i = 0; i < fields.length; i++) {
            var name = fields[i].name;
            var value = fields[i].value;
            if (angular.isObject(value)) {
              userService.model._model[name] = {};
              angular.copy(value, userService.model._model[name]);
            } else {
              userService.model._model[name] = value;
            }
          }
        };

        userService.taxify = {};

        /**
         * taxify.save
         * @param {object} o
         * @returns {callback} 
         */
        userService.taxify.save = function(o) {
          return $http({
            method:"PUT",
            url:baseUrl+"/rtapi/v1/users/taxify",
            data:o,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * model.checklist
         */
        userService.model.checklist = function() {
          var result = true;
          result = result || userService.model._model ? true : false;
          // TODO: Individual Address
        };

        /**
         * model.reset
         */
        userService.model.reset = function() {
          userService.model._model = {};
        };

        userService.model.reset();

        /**
         * model.set
         * @param {object} model
         */
        userService.model.set = function(model) {
          console.log('userService.model.set');
          var oModel=angular.copy(model);
          for (var i=0; i<fields.length; i++) {
            var name = fields[i].name;
            if (name in oModel) {
              if (fields[i].select===true && oModel[name].value) {
                userService.model._model[name] = oModel[name].value; //??
              } else {
                userService.model._model[name] = oModel[name];
              }
            }
          }
        };

        /**
         * model.get
         * @returns {object}
         */
        userService.model.get = function() {
          return angular.copy(userService.model._model);
        };

        /**
         * fetch
         * @returns {callback}
         */
        userService.fetch = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/users/view?t=" + (new Date()).toISOString(),
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * details
         * @returns {callback}
         */
        userService.details = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/users/details"
          });
        };

        userService.account = function() {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/users/account"
          });
        };

        /**
         * init
         */
        userService.init = function() {
          $log.log('user.service.init');
          userService.defaults();
          rtsocket.responders.user = {
            update:function(data) {
              userService.model.set(data.user);
              navService.refresh('user', data.user);
              var message = {command:'counts', userId:data.user._id};
              rtsocket.sender(message);
            },
            counts : function(data) {
              topService.refresh('cartCount', data.cart);
	      notificationsService.count.set(data.notifications);
              bottomService.refresh('notificationCount', data.notifications);
	      profileService.refresh('notificationCount', data.notifications);
              bottomService.refresh('messagesCount', data.messages);
            }
          };
        };
        userService.init();

        return userService;
      }
    ]
  );
})(console, angular);
