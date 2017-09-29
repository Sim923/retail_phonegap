/**
 * @fileOverview Main AngularJS Application Services for Reeltrail Mobile application
 * @name app.services.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.config(
    [
      '$provide',
      function($provide) {
        $provide.decorator(
          '$log',
          [
            '$delegate',
            'Logging',
            function($delegate, Logging) {
              Logging.enabled = true;
              var methods = {
                error: function() {
                  if (Logging.enabled) {
                    $delegate.error.apply($delegate, arguments);
                    Logging.error.apply(null, arguments);
                  }
                },
                log: function() {
                  if (Logging.enabled) {
                    $delegate.log.apply($delegate, arguments);
                    Logging.log.apply(null, arguments);
                  }
                },
                info: function() {
                  if (Logging.enabled) {
                    $delegate.info.apply($delegate, arguments);
                    Logging.info.apply(null, arguments);
                  }
                },
                warn: function() {
                  if (Logging.enabled) {
                    $delegate.warn.apply($delegate, arguments);
                    Logging.warn.apply(null, arguments);
                  }
                }
              };
              return methods;
            }
          ]
        );
      }
    ]
  );

  RTMobileApp.factory(
    'rtsocket',
    [
      '$log',
      '$window',
      'socketFactory',
      'baseurlService',
      function($log, $window, socketFactory, baseurlService) {
        var baseUrl = baseurlService.address;
        var rtsocket = socketFactory({url:baseUrl+'/sockjs/sockjs'});
        rtsocket.responders={};
        rtsocket.sender = function(oMessage) {
          var token = $window.localStorage.token;
          var auth = angular.extend({token:token}, oMessage);
          var raw = JSON.stringify(auth);
          rtsocket.send(raw);
        };
        rtsocket.init = function() {
          $log.log('rtsocket.init');
        };
        return rtsocket;
      }
    ]
  );

  RTMobileApp.service(
    'Logging',
    function($injector) {
      var service = {
        error: function() {
          self.type = 'error';
          log.apply(self, arguments);
        },
        warn: function() {
          self.type = 'warn';
          log.apply(self, arguments);
        },
        info: function() {
          self.type = 'info';
          log.apply(self, arguments);
        },
        log: function() {
          self.type = 'log';
          log.apply(self, arguments);
        },
        enabled: false,
        logs: []
      };
      var log = function() {
        var args = [];
        if (typeof arguments === 'object') {
          for(var i = 0; i < arguments.length; i++ ) {
            var arg = arguments[i];
            var exception = {};
            exception.message = arg.message;
            exception.stack = arg.stack;
            args.push(JSON.stringify(exception));
          }
        }
        var eventLogDateTime = moment(new Date()).format('LLL');
        var logItem = {
          time: eventLogDateTime,
          message: args.join('\n'),
          type: type
        };
        service.logs.push(logItem);
      };
      return service;
    }
  );

  RTMobileApp.factory(
    'tokenInterceptor',
    [
      '$q',
      '$window',
      function ($q, $window) {
        var service = {
          response:function(response) {
            return response || $q.when(response);
          },
          responseError:function(response) {
            console.log('responseErr', response);
            if (response && response.status === 404) {
            }
            if (response && response.status >= 500) {
            }
            return $q.reject(response);
          },
          request:function(config) {
            config.headers = config.headers || {};
            if ($window.localStorage.token) {
              config.headers['x-access-token'] = $window.localStorage.token;
            }
            return config || $q.when(config);
          },
          requestError:function(request) {
            return $q.reject(request);
          }
        };
        return service;
      }
    ]
  );

  RTMobileApp.config(
    [
      '$httpProvider',
      function($httpProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
      }
    ]
  );

  RTMobileApp.factory(
    'authFactory',
    [
      '$http',
      '$state',
      '$window',
      '$q',
      '$rootScope',
      'deviceService',
      'baseurlService',
      function ($http, $state, $window, $q, $rootScope, deviceService, baseurlService) {
        var baseUrl = baseurlService.address;
        var apiBaseUrl = baseUrl+'/rtapi/v1/';
        var service = {
          login : function (username, password, socketid) {
            var deferred = $q.defer();
            $http.post(
              apiBaseUrl + 'users/login',
              {
                username:username,
                password:password,
                socketid:socketid
              }
            ).then(
              function (resp) {
                console.log(resp.data);
                $window.localStorage.token = resp.data.token;
		$window.localStorage.isConfirmed = resp.data.isConfirmed;
                deferred.resolve(true);
              },
              function (resp) {
		console.log(resp);
                return deferred.reject('opps there is a problem when trying to authenticate');
              }
            );
            return deferred.promise;
          },
          get : function() {
            return $window.localStorage.token;
          },
          set : function(tok) {
            $window.localStorage.token = tok;
          },
          logout : function () {
            if ($window.localStorage.token) {
              delete $window.localStorage.token;
            }
            $state.path('/');
          },
          isUserLogged : function ()
          {
            return !!$window.localStorage.token;
          }
        };
        return service;
      }
    ]
  );

  RTMobileApp.run(
    [
      'deviceService',
      'userService',
      "$rootScope",
      "$location",
      'authFactory',
      '$state',
      function(deviceService, userService, $rootScope, $location, authFactory, $state) {
        $rootScope.$on(
          "$stateChangeStart",
          function(evt, to, from) {
            console.log("stateChangeStart is running");
            if (to) {
              var redirected = false;
              var user = userService.model.get();
              if (to.secured && redirected===false) {
                if (authFactory.isUserLogged()===false) {
                  redirected = true;
                  $rootScope.$evalAsync(function () {
                    $state.go('login');
                  });
                }
              }
              var isConfirmed = user.isConfirmed;
              if (to.confirmed && redirected===false && authFactory.isUserLogged()===true) {
                if (isConfirmed===false) {
                  redirected = true;
                  $rootScope.$evalAsync(function () {
                    $state.go('confirm-reminder');
                  });
                }
              }
              if (to.checklist && redirected===false && isConfirmed && authFactory.isUserLogged()===true) {
                var checklist = typeof(user.dob)==='undefined' || typeof(user.primaryAddress)==='undefined' || typeof(user.paymentGateways.braintree.merchantAccount)==='undefined';
                console.log('checklist', checklist);
                if (checklist===true) {
                  redirected = true;
                  $rootScope.$evalAsync(function () {
                    $state.go('checklist');
                  });
                }
              }
            }
          }
        );

        $rootScope.$on(
          '$stateChangeSuccess',
          function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
          });

        $rootScope.$on(
          "$stateChangeError",
          function(evt, toState, toParams, fromState, fromParams, error) {
            console.log('stateChangeError', evt, toState, toParams, fromState, fromParams, error);
          }
        );
      }
    ]
  );

})(console, angular);
