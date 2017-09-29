/**
 * @fileOverview
 * @name register.quick.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://anomalistdesign.com)
 * @license UNLICENSED
 */

(function(console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'registerQuickService',
    [
      '$http',
      'baseurlService',
      function($http, baseurlService) {
        var registerQuickService = {};

        registerQuickService.model = {};
        registerQuickService.model._model = {};

        var baseUrl = baseurlService.address;

        var fields = [
          {name:'firstName', value:''},
          {name:'lastName', value:''},
          {name:'agreedToTerms', value:false},
          {name:'username', value:''},
          {name:'password', value:''},
          {name:'confirmPassword', value:''},
          {name:'email', value:''},
          {name:'socketid', value:''}
        ];

        /**
         * model.set
         * @param {object} model
         */
        registerQuickService.model.set = function(model) {
          console.log('registerQuickService.model.set');
          for (var i=0; i<fields.length; i++) {
            var name = fields[i].name;
            if (name in model) {
              if (fields[i].select===true && model[name].value) {
                console.dir(model[name]);
                registerQuickService.model._model[name] = model[name].value;
              } else {
                registerQuickService.model._model[name] = model[name];
              }
            }
          }
        };

        /**
         * model.get
         * @returns {object}
         */
        registerQuickService.model.get = function() {
          return registerQuickService.model._model;
        };

        /**
         * register
         * @returns {callback}
         */
        registerQuickService.register = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/users/register/quick",
            data: registerQuickService.model._model,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * init
         */
        registerQuickService.init = function() {
          for (var i = 0; i < fields.length; i++) {
            var name = fields[i].name;
            var value = fields[i].value;
            registerQuickService.model._model[name] = value;
          }
        };

        registerQuickService.init();

        return registerQuickService;
      }
    ]
  );
})(console, angular);
