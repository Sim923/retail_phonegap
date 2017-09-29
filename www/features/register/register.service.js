/**
 * @fileOverview register service
 * @name register.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function () {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'registerService',
    [
      '$log',
      '$http',
      'baseurlService',
      function($log, $http) {

        var registerService = {};
        registerService.model = {};
        registerService.model._model = {};

        var baseUrl = baseurlService.address;

        var fields = [
          {name:'firstName', value:''},
          {name:'lastName', value:''},
          {name:'type', value:'individual'},
          {name:'companyName', value:''},
          {name:'monthOfBirth', value:'01', select:true},
          {name:'dayOfBirth', value:'01', select:true},
          {name:'yearOfBirth', value:(new Date().getFullYear() - 12).toString(), select:true},
          {name:'dob', value:{day:'', month:'', year:''}},
          {name:'line1', value:''},
          {name:'line2', value:''},
          {name:'city', value:''},
          {name:'state', value:''},
          {name:'zipCode', value:''},
          {name:'phone', value:''},
          {name:'agreedToTerms', value:false},
          {name:'username', value:''},
          {name:'password', value:''},
          {name:'confirmPassword', value:''},
          {name:'email', value:''},
          {name:'socketid', value:''},
          {name:'address', value:{_address:{}}}
        ];

        /**
         * model.set
         * @param {object} model
         */
        registerService.model.set = function(model) {
          console.log('registerService.model.set');
          for (var i=0; i<fields.length; i++) {
            var name = fields[i].name;
            if (name in model) {
              if (fields[i].select===true && model[name].value) {
                console.dir(model[name]);
                registerService.model._model[name] = model[name].value;
              } else {
                registerService.model._model[name] = model[name];
              }
            }
          }
        };

        /**
         * model.get
         * @returns {object} 
         */
        registerService.model.get = function() {
          return registerService.model._model;
        };

        /**
         * register
         * @returns {callback} 
         */
        registerService.register = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/users/register",
            data: registerService.model._model,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * init
         */
        registerService.init = function() {
          for (var i = 0; i < fields.length; i++) {
            var name = fields[i].name;
            var value = fields[i].value;
            registerService.model._model[name] = value;
          }
        };

        registerService.init();

        return registerService;
      }
    ]
  );
})();