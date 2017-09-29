/**
 * @fileOverview Register ui-routes configuration
 * @name register.routes.js
 * @author Matthew Aaron Raymer
 * @license UNLICENSED
 */
(function (angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.config(
    [
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        var register = {
          name: 'register-quick',
          url: '/register-quick',
          parent:'',
          views:{
            'content@':{
              templateUrl:'features/register/register.quick.html',
              controller:'register.quick.controller',
              controllerAs:'rqc'
            },
            'topNav@':{
              templateUrl:'common/navigation/top/top.register.html',
              controller:'top.controller'
            }
          }
        };
        $stateProvider.state(register);
        var registerStep1State = {
          name: 'register',
          url: '^/register/step1',
          parent:'',
          views:{
            'content@':{
              templateUrl:'features/register/register.wizard.step.1.html',
              controller:'register.controller',
              controllerAs:'rs1c'
            },
            'topNav@':{
              templateUrl:'common/navigation/top/top.register.html',
              controller:'top.controller'
            }
          }
        };
        $stateProvider.state(registerStep1State);

        var registerStep2State = {
          name: 'register.step2',
          url: '^/register/step2',
          parent:'register',
          views:{
            'content@':{
              templateUrl:'features/register/register.wizard.step.2.html',
              controller:'register.step2.controller',
              controllerAs:'rs2c'
            },
            'topNav@':{
              templateUrl:'common/navigation/top/top.register.html',
              controller:'top.controller'
            }
          }
        };
        $stateProvider.state(registerStep2State);

        var registerStep3State = {
          name: 'register.step3',
          url: '^/register/step3',
          parent:'register',
          views:{
            'content@':{
              templateUrl:'features/register/register.wizard.step.3.html',
              controller:'register.step3.controller',
              controllerAs:'rs3c'
            },
            'topNav@':{
              templateUrl:'common/navigation/top/top.register.html',
              controller:'top.controller'
            }
          }
        };
        $stateProvider.state(registerStep3State);

        var registerConfirmationState = {
          name: 'register.confirm',
          url: '^/register/confirm',
          parent:'register',
          views:{
            'content@':{
              templateUrl:'features/register/register.confirmation.html',
              controller:'register.confirmation.controller',
              controllerAs:'rcc'
            },
            'topNav@':{
              templateUrl:'common/navigation/top/top.register.html',
              controller:'top.controller'
            }
          }
        };
        $stateProvider.state(registerConfirmationState);

        var registerSuccessState = {
          name: 'register.success',
          url: '^/register/success',
          parent:'',
          views:{
            'content@':{
              templateUrl:'features/register/register.success.html',
              controller:'register.success.controller',
              controllerAs:'rsc'
            },
            'topNav@':{
              templateUrl:'common/navigation/top/top.register.html',
              controller:'top.controller'
            }
          }
        };
        $stateProvider.state(registerSuccessState);
      }
    ]
  );
})(angular);
