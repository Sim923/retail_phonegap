/**
 * @fileOverview register service
 * @name profile.service.js
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
        var states = [
          {
            name: 'profile.fees',
            url: '^/profile/fees',
            secured:true,
            confirmed:true,
            checklist:false,
            data : {
              status : 'profile'
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/payments-fees.html',
                controller:'profile.items.controller',
                controllerAs:'pic'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          }, {
            name: 'profile.items',
            url: '^/profile/items',
            secured:true,
            confirmed:true,
            checklist:false,
            data : {
              status : 'profile'
            },
            resolve : {
              categories:[
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
              listings: [
                'itemService',
                function(itemService) {
                  return itemService.list.fetch.user.all(0, 12).then(
                    function(resp) {
                      console.log(resp);
                      return {status:true, data:resp.data.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/items.html',
                controller:'profile.items.controller',
                controllerAs:'pic'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          }, {
            name: 'profile.adventures',
            url: '^/profile/adventures',
            secured:true,
            confirmed:true,
            data : {
              status : 'profile'
            },
            resolve : {
              categories:[
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
              adventures: [
                'adventureService',
                function(adventureService) {
                  return adventureService.list.fetch.user.all(0, 12).then(
                    function(resp) {
                      return {status:true, data:resp.data.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/adventures.html',
                controller:'profile.adventures.controller',
                controllerAs:'pac'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.referrals',
            url: '^/profile/referrals',
            secured:true,
            confirmed:true,
            checklist:false,
            data : {
              status : 'profile'
            },
            resolve : {
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/referrals.html',
                controller:'profile.referrals.controller',
                controllerAs:'prc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },{
            name: 'profile.watches',
            url: '^/profile/watches',
            secured:true,
            confirmed:true,
            checklist:false,
            data : {
              status : 'profile'
            },
            resolve : {
              watches : [
                'watchesService',
                function(watchesService) {
                  return watchesService.fetch.user().then(
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
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/watchlist.html',
                controller:'profile.watchlist.controller',
                controllerAs:'pwc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.details',
            url: '^/profile/details',
            secured:true,
            confirmed:false,
            checklist:false,
            data : {
              status : 'profile'
            },
            resolve: {
              timezones : [
                'resourceService',
                function(resourceService) {
                  return resourceService.timezones().then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log('resp', resp);
                      return {status:false};
                    }
                  );
                }
              ],
              user : [
                'userService',
                function(userService) {
                  console.log('resolve.user');
                  return userService.details().then(
                    function(resp) {
                      console.log(resp);
                      userService.model.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
              primary : [
                'addressService',
                function(addressService) {
                  return addressService.address.primary(
                    function(resp) {
                      console.log('Primary address: ', resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
              address : [
                'addressService',
                function(addressService) {
                  console.log('profile.adventures.controller.resolve');
                  return addressService.address.list().then(
                    function(resp) {
                      console.log('resp', resp);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log('resp', resp);
                      return {status:false};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/details.html',
                controller:'profile.details.controller',
                controllerAs:'pdc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.support',
            url: '^/profile/support',
            secured:true,
            confirmed:false,
            checklist:false,
            data : {
              status : 'profile'
            },
            resolve: {
              user:[
                'userService',
                function(userService) {
                  return userService.fetch().then(
                    function(resp) {
                      userService.model.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:true};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/support.html',
                controller:'profile.support.controller',
                controllerAs:'psc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.subscription',
            url: '^/profile/subscription',
            secured:true,
            confirmed:true,
            checklist:false,
            data : {
              status : 'profile'
            },
            resolve: {
              user : [
                'userService',
                function(userService) {
                  console.log('resolve.user');
                  return userService.details().then(
                    function(resp) {
                      console.log(resp);
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
    'userService',
    function(userService) {
                  return userService.account().then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
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
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/subscription/subscription.html',
                controller:'subscription.controller',
                controllerAs:'sc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.address',
            url: '^/profile/address',
            secured:true,
            confirmed:true,
            checklist:false,
            data : {
              status : 'profile'
            },
            resolve : {
              primary : [
                'addressService',
                function(addressService) {
                  return addressService.address.primary(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
              address : [
                'addressService',
                function(addressService) {
                  console.log('profile.address.controller.resolve');
                  return addressService.address.list().then(
                    function(resp) {
                      console.log('resp', resp);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log('resp', resp);
                      return {status:false};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/addresses.html',
                controller:'profile.address.controller',
                controllerAs:'pac'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          }, {
            name: 'profile.address.edit',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/profile/address.edit',
            data : {
              status : 'profile'
            },
            resolve : {
              countries:[
                'countryService',
                function(countryService) {
                  return countryService.countries.fetch().then(
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
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/address.edit.html',
                controller:'profile.address.edit.controller',
                controllerAs:'paec'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          }, {
            name: 'profile.seller-settings.edit',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/profile/seller-settings.edit',
            data : {
              status : 'profile'
            },
            resolve : {
              primary : [
                'addressService',
                function(addressService) {
                  return addressService.address.primary(
                    function(resp) {
                      console.log('Primary address: ', resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
              countries:[
                'countryService',
                function(countryService) {
                  return countryService.countries.fetch().then(
                    function(resp) {
                      console.log('Primary countries: ', resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false};
                    }
                  );
                }
              ],
              address : [
                'addressService',
                function(addressService) {
                  // console.log('profile.adventures.controller.resolve');
                  return addressService.address.list().then(
                    function(resp) {
                      console.log('resp', resp);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log('resp', resp);
                      return {status:false};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/address.edit.html',
                controller:'profile.address.edit.controller',
                controllerAs:'paec'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.seller-settings',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/profile/seller-settings',
            data : {
              status : 'profile'
            },
            resolve : {
              account : [
                'userService',
                'paymentGatewayService',
                function(userService, paymentGatewayService) {
                  var id=userService.model._model.paymentGateways.braintree.merchantAccount;
                  if (typeof(id)==='undefined') {
                    console.log('no merchant account', userService.model._model.paymentGateways.braintree);
                    return {status:false, data:{routingNumber:"", accountNumberLast4:"", status:""}};
                  } else {
                    return paymentGatewayService.accounts.get(id).then(
                      function(resp) {
                        console.log('resolved account', resp);
                        return {status:true, data:resp.data};
                      },
                      function(resp) {
                        return {status:false};
                      }
                    );
                  }
                }
              ],
              user:[
                'userService',
                function(userService) {
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
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/seller-settings.html',
                controller:'profile.seller.settings.controller',
                controllerAs:'pssc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.notifications',
            secured:true,
            confirmed:false,
            checklist:false,
            url: '^/profile/notifications',
            data : {
              status : 'profile'
            },
            resolve : {
              notifications:[
                'notificationsService',
                function(notificationsService) {
                  return notificationsService.user().then(
                    function(resp) {
                      console.log(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:[]};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/profile-notifications.html',
                controller:'profile.notifications.controller',
                controllerAs:'pnc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          }, {
            name: 'profile.feedback',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/feedback',
            data : {
              status : 'profile'
            },
            resolve : {
              user:[
                'userService',
                function(userService) {
                  return userService.fetch().then(
                    function(resp) {
                      userService.model.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:true};
                    }
                  );
                }
              ],
              feedback:[
                'feedbackService',
                function(feedbackService) {
                  return feedbackService.user().then(
                    function(resp) {
                      console.log('feedback', resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:[]};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/profile.feedback.html',
                controller:'profile.feedback.controller',
                controllerAs:'pfc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.feedback.submit',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/feedback/submit/:id',
            params: {
              id: '',
              saleId:''
            },
            data : {
              status : 'profile'
            },
            resolve: {
              user:[
                'userService',
                function(userService) {
                  return userService.fetch().then(
                    function(resp) {
                      userService.model.set(resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:true};
                    }
                  );
                }
              ],
              sale : [
                '$stateParams',
                'salesService',
                function($stateParams, salesService) {
                  var id=$stateParams.saleId ? $stateParams.saleId : $stateParams.id;
                  console.log('profile.feedback.submit.sale.id', id);
                  return salesService.get(id).then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log("fetch sale error");
                      return {status:false, data:{}};
                    }
                  );
                }
              ],
              feedback : [
                '$stateParams',
                'feedbackService',
                function($stateParams, feedbackService) {
                  var id=$stateParams.saleId ? $stateParams.saleId : $stateParams.id;
                  console.log('profile.feedback.submit.feedback.id', $stateParams);
                  return feedbackService.sale(id).then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      console.log("fetch feedback error");
                      return {status:false, data:{}};
                    }
                  );
                }
              ],
              listing : [
                '$stateParams',
                'feedbackService',
                'salesService',
                function($stateParams, feedbackService, salesService) {
                  var id=$stateParams.saleId ? $stateParams.saleId : $stateParams.id;
                  console.log('profile.feedback.submit.listing.id', id);
                  return salesService.get(id).then(
                    function(resp) {
                      var listingId = resp.data.listingId ? resp.data.listingId._id : "";
                      console.log(listingId);
                      if (listingId) {
                        return feedbackService.listing.fetch(listingId).then(
                          function(resp) {
                            return {status:true, data:resp.data};
                          },
                          function(resp) {
                            console.log("look up listing from sale error");
                            return {status:false, data:{}};
                          }
                        );
                      } else {
                        return {status:false, data:{}};
                      }
                    },
                    function(resp) {
                      console.log("listing error");
                      return {status:false, data:{}};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/profile.feedback.submit.html',
                controller:'profile.feedback.submit.controller',
                controllerAs:'pfsc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.sales',
            secured:true,
            confirmed:true,
            checklist:true,
            url: '^/profile/sales',
            data : {
              status : 'profile'
            },
            resolve : {
              sales:[
                'salesService',
                function(salesService) {
                  return salesService.fetch().then(
                    function(resp) {
                      console.log('resolved routes sales: ', resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:[]};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/profile-sold.html',
                controller:'profile.sales.controller',
                controllerAs:'psc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.shipping',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/profile/shipping',
            data : {
              status : 'profile'
            },
            resolve : {
              sales:[
                'salesService',
                function(salesService) {
                  return salesService.fetch().then(
                    function(resp) {
                      console.log('resolved routes sales: ', resp.data);
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:[]};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/profile-sold.html',
                controller:'profile.sales.controller',
                controllerAs:'psc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.purchased',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/profile/purchased',
            data : {
              status : 'profile'
            },
            resolve : {
              purchases:[
                'purchasesService',
                function(purchasesService) {
                  return purchasesService.user().then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:[]};
                    }
                  );
                }
              ],
              refunds : [
                'refundsService',
                function(refundsService) {
                  return refundsService.user().then(
                    function(resp) {
                      return {status:true, data:resp.data};
                    },
                    function(resp) {
                      return {status:false, data:[]};
                    }
                  );
                }
              ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/purchased.html',
                controller:'profile.purchased.controller',
                controllerAs:'ppc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.about',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/profile/about',
            data : {
              status : 'profile'
            },
            resolve : {
              // purchases:[
              //   'purchasesService',
              //   function(purchasesService) {
              //     return purchasesService.user().then(
              //       function(resp) {
              //         return {status:true, data:resp.data};
              //       },
              //       function(resp) {
              //         return {status:false, data:[]};
              //       }
              //     );
              //   }
              // ],
              // refunds : [
              //   'refundsService',
              //   function(refundsService) {
              //     return refundsService.user().then(
              //       function(resp) {
              //         return {status:true, data:resp.data};
              //       },
              //       function(resp) {
              //         return {status:false, data:[]};
              //       }
              //     );
              //   }
              // ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/about.html',
                controller:'profile.about.controller',
                controllerAs:'pac'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
    controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.payment-method',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/profile/payment-method',
            data : {
              status : 'profile'
            },
            resolve : {
              // purchases:[
              //   'purchasesService',
              //   function(purchasesService) {
              //     return purchasesService.user().then(
              //       function(resp) {
              //         return {status:true, data:resp.data};
              //       },
              //       function(resp) {
              //         return {status:false, data:[]};
              //       }
              //     );
              //   }
              // ],
              // refunds : [
              //   'refundsService',
              //   function(refundsService) {
              //     return refundsService.user().then(
              //       function(resp) {
              //         return {status:true, data:resp.data};
              //       },
              //       function(resp) {
              //         return {status:false, data:[]};
              //       }
              //     );
              //   }
              // ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/payment-methods.html',
                controller:'profile.payment-method.controller',
                controllerAs:'ppmc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
                controller:'top.controller',
                controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
                controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.appsetting',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/profile/appsetting',
            data : {
              status : 'profile'
            },
            resolve : {
              // purchases:[
              //   'purchasesService',
              //   function(purchasesService) {
              //     return purchasesService.user().then(
              //       function(resp) {
              //         return {status:true, data:resp.data};
              //       },
              //       function(resp) {
              //         return {status:false, data:[]};
              //       }
              //     );
              //   }
              // ],
              // refunds : [
              //   'refundsService',
              //   function(refundsService) {
              //     return refundsService.user().then(
              //       function(resp) {
              //         return {status:true, data:resp.data};
              //       },
              //       function(resp) {
              //         return {status:false, data:[]};
              //       }
              //     );
              //   }
              // ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/app.settings.html',
                controller:'profile.appsetting.controller',
                controllerAs:'pasc'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
                controller:'top.controller',
                controllerAs:'tc'
              },
              'bottomNav@':{
                templateUrl:'common/navigation/bottom/bottom.html',
                controller:'bottom.controller',
                controllerAs:'bc'
              }
            }
          },
          {
            name: 'profile.payment-method-edit',
            secured:true,
            confirmed:true,
            checklist:false,
            url: '^/profile/payment-method/payment-method-edit',
            data : {
              status : 'profile'
            },
            resolve : {
              // purchases:[
              //   'purchasesService',
              //   function(purchasesService) {
              //     return purchasesService.user().then(
              //       function(resp) {
              //         return {status:true, data:resp.data};
              //       },
              //       function(resp) {
              //         return {status:false, data:[]};
              //       }
              //     );
              //   }
              // ],
              // refunds : [
              //   'refundsService',
              //   function(refundsService) {
              //     return refundsService.user().then(
              //       function(resp) {
              //         return {status:true, data:resp.data};
              //       },
              //       function(resp) {
              //         return {status:false, data:[]};
              //       }
              //     );
              //   }
              // ]
            },
            parent:'',
            views:{
              'content@':{
                templateUrl:'features/profile/payment-methods.edit.html',
                controller:'profile.payment-method-edit.controller',
                controllerAs:'ppmec'
              },
              'topNav@':{
                templateUrl:'common/navigation/top/top.html',
    controller:'top.controller',
    controllerAs:'tc'
              },
              'bottomNav@':{
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
