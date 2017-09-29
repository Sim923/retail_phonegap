/**
 * @fileOverview Primary-level ui-routes configuration
 * @name app.routes.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.config(
    [
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        var states = [{
          name: 'home',
          url: '',
          secured:false,
          confirmed:false,
          checklist:false,
          data: {
            status:'home'
          },
          resolve : {
            categories: [
              'categoryService',
              function(categoryService) {
                return categoryService.categories.fetch().then(
                  function(resp) {
                    console.log(resp);
                    categoryService.categories.set(resp.data);
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false};
                  }
                );
              }
            ],
            user : [
              'userService',
              function(userService) {
                console.log('resolve.user');
                return userService.fetch().then(
                  function(resp) {
                    userService.model.set(resp.data);
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false};
                  }
                );
              }
            ],
            account : [
              'authFactory',
              'userService',
              function(authFactory, userService) {
                if (authFactory.isUserLogged()) {
                  console.log('User is loggedin');
                  return userService.account();
                } else {
                  return {status:false};
                }
              }
            ],
            subscriptions : [
              'resourceService',
              function(resourceService) {
                return resourceService.subscriptions().then(
                  function(resp) {
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false};
                  }
                );
              }
            ]
          },
          views : {
            'content':{
              templateUrl:'features/browse/browse.html',
              controller:'browse.controller',
              controllerAs:'bc'
            },
            'topNav':{
              templateUrl:'common/navigation/top/top.html',
	      controller:'top.controller',
              controllerAs:'tc'
            },
            'bottomNav':{
              templateUrl:'common/navigation/bottom/bottom.html',
	      controller:'bottom.controller',
              controllerAs:'bc'
            }
          }
        }, {
          name: 'sell-landing',
          url: '/sell-landing',
          data : {
            status : 'sell'
          },
          authenticate:true,
          secured:false,
          confirmed:false,
          checklist:true,
          views : {
            'content':{
              templateUrl:'features/sell/sell.landing.html',
              controller:'sell.landing.controller',
              controllerAs:'slc'
            },
            'topNav':{
              templateUrl:'common/navigation/top/top.html',
	      controller:'top.controller',
	      controllerAs:'tc'
            },
            'bottomNav':{
              templateUrl:'common/navigation/bottom/bottom.html',
              controller:'bottom.controller',
              controllerAs:'bc'
            }
          }
        }, {
          name: 'search',
          url: '/search',
          data : {
            status : 'search'
          },
          resolve : {
            categories: [
              'categoryService',
              function(categoryService) {
                return categoryService.categories.fetch().then(
                  function(resp) {
                    categoryService.categories.set(resp.data);
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false};
                  }
                );
              }
            ],
            user : [
              'userService',
              function(userService) {
                console.log('resolve.user');
                return userService.fetch().then(
                  function(resp) {
                    userService.model.set(resp.data);
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false};
                  }
                );
              }
            ]
          },
          authenticate:false,
          secured:false,
          confirmed:false,
          checklist:false,
          views : {
            'content':{
              templateUrl:'features/search/index.html',
              controller:'search.controller',
              controllerAs:'sc'
            },
            'topNav':{
              templateUrl:'common/navigation/top/top.html',
	      controller:'top.controller',
	      controllerAs:'tc'
            },
            'bottomNav':{
              templateUrl:'common/navigation/bottom/bottom.html',
              controller:'bottom.controller',
              controllerAs:'bc'
            }
          }
        }, {
          name: 'messaging',
          url: '/messaging',
          data : {
            status : 'messaging'
          },
          params: {
            username:null,
            userId:null,
            listingId:null
          },
          authenticate:true,
          secured:true,
          confirmed:false,
          checklist:false,
          resolve: {
            user : [
              'userService',
              function(userService) {
                console.log('resolve.user');
                return userService.fetch().then(
                  function(resp) {
                    userService.model.set(resp.data);
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false, data:{}};
                  }
                );
              }
            ],
            threads:[
              'messagesService',
              function(messagesService) {
                return messagesService.user().then(
                  function(resp) {
                    console.log('profile.messages.resolve.threads', resp.data);
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false, data:[]};
                  }
                );
              }
            ],
            seller : [
              '$stateParams',
              function($stateParams) {
                console.log('messaging.resolves.sender', $stateParams.username, $stateParams.userId, $stateParams.listingId);
                return {username:$stateParams.username, userId:$stateParams.userId, listingId:$stateParams.listingId};
              }
            ]
          },
          views : {
            'content':{
              templateUrl:'features/messaging/messages.html',
              controller:'messaging.threads.controller',
              controllerAs:'mtc'
            },
            'topNav':{
              templateUrl:'common/navigation/top/top.html',
	      controller:'top.controller',
	      controllerAs:'tc'
            },
            // 'bottomNav':{
            //   templateUrl:'common/navigation/bottom/bottom.html',
            //   controller:'bottom.controller',
            //   controllerAs:'bc'
            // }
          }
        }, {
          name: 'profile',
          url: '^/profile',
          data : {
            status : 'profile'
          },
          resolve: {
            user : [
              'userService',
              function(userService) {
                console.log('profile.resolve.user');
                return userService.fetch().then(
                  function(resp) {
                    userService.model.set(resp.data);
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false, data:{}};
                  }
                );
              }
            ],
            average : [
              'userService',
              'feedbackService',
              function(userService, feedbackService) {
                console.log('profile.resolve.average');
                var username = userService.model.get().username;
                return feedbackService.average(username).then(
                  function(resp) {
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
                    return {status:false, data:{}};
                  }
                );
              }
            ]
          },
          authenticate:true,
          secured:true,
          confirmed:false,
          checklist:false,
          views : {
            'content':{
              templateUrl:'features/profile/index.html',
              controller:'profile.controller',
              controllerAs:'pc'
            },
            'topNav':{
              templateUrl:'common/navigation/top/top.html',
	      controller:'top.controller',
	      controllerAs:'tc'
            },
            'bottomNav':{
              templateUrl:'common/navigation/bottom/bottom.html',
              controller:'bottom.controller',
              controllerAs:'bc'
            }
          }
        }, {
          name: 'confirm-reminder',
          url: '/confirm-reminder',
          data : {
            status : 'confirm-reminder'
          },
          // resolve: {
          //   user : [
          //     'userService',
          //     function(userService) {
          //       console.log('resolve.user');
          //       return userService.fetch().then(
          //         function(resp) {
          //           userService.model.set(resp.data);
          //           return {status:true, data:resp.data};
          //         },
          //         function(resp) {
          //           return {status:false};
          //         }
          //       );
          //     }
          //   ]
          // },
          authenticate:true,
          secured:false,
          confirmed:false,
          checklist:false,
          views : {
            'content':{
              templateUrl:'features/confirm-reminder/confirm-gate.html'
              // controller:'confirm.controller',
              // controllerAs:'crc'
            },
            'topNav':{
              templateUrl:'common/navigation/top/top.html',
	      controller:'top.controller',
	      controllerAs:'tc'
            },
            'bottomNav':{
              templateUrl:'common/navigation/bottom/bottom.html',
              controller:'bottom.controller',
              controllerAs:'bc'
            }
          }
        }, {
	  name: 'checklist',
	  url: '/checklist',
	  data : {
	    status : 'checklist'
	  },
	  resolve: {
	    user : [
	      'userService',
	      function(userService) {
		console.log('resolve.user');
		return userService.fetch().then(
		  function(resp) {
		    userService.model.set(resp.data);
		    return {status:true, data:resp.data};
		  },
		  function(resp) {
		    return {status:false};
		  }
		);
	      }
	    ]
	  },
	  authenticate:true,
	  secured:false,
	  confirmed:false,
	  checklist:false,
	  views : {
	    'content':{
	      templateUrl:'features/checklist/checklist.html',
	      controller:'checklist.controller',
	      controllerAs:'cc'
	    },
	    'topNav':{
	      templateUrl:'common/navigation/top/top.html',
	      controller:'top.controller',
	      controllerAs:'tc'
	    },
	    'bottomNav':{
	      templateUrl:'common/navigation/bottom/bottom.html',
	      controller:'bottom.controller',
	      controllerAs:'bc'
	    }
	  }
	}, {
	  name: 'confirm',
	  url: '/confirm/:hash',
	  data : {
	    status : 'confirm'
	  },
	  resolve: {
	    confirm : [
	      '$state',
	      'confirmService',
	      function($state, confirmService) {
		var hash = $state.current.params.hash;
		console.log('users.confirm.hash.resolve', hash);
		return confirmService.checkHash(hash).then(
		  function(resp) {
		    return {status:true, resend:false, data:resp.data};
		  },
		  function(resp) {
		    var resend=false;
		    if (resp.status===401) {
		      resend=true;
		    }
		    return {status:false, resend:resend, data:resp.data};
		  }
		);
	      }
	    ]
	  },
	  authenticate:true,
	  secured:false,
	  confirmed:false,
	  checklist:false,
	  views : {
	    'content':{
	      templateUrl:'features/checklist/checklist.html',
	      controller:'checklist.controller',
	      controllerAs:'cc'
	    },
	    'topNav':{
	      templateUrl:'common/navigation/top/top.html',
	      controller:'top.controller',
	      controllerAs:'tc'
	    },
	    'bottomNav':{
	      templateUrl:'common/navigation/bottom/bottom.html',
	      controller:'bottom.controller',
	      controllerAs:'bc'
	    }
	  }
	}
		     ];
        for (var i=0; i<states.length; i++) {
          $stateProvider.state(states[i]);
        }

      }
    ]
  );
})(console, angular);
