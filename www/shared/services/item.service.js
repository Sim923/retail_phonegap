/**
 * @fileOverview register service
 * @name item.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'itemService',
    [
      '$log',
      '$http',
      'imageService',
      'categoryService',
      'cartService',
      'offerService',
      'authFactory',
      '$state',
      'baseurlService',
      function($log, $http, imageService, categoryService, cartService, offerService, authFactory, $state, baseurlService) {

        var itemService = {};

        itemService.id = {};
        itemService.id._id='';

        itemService.upload = {};

        itemService.upload.done = false;

        var baseUrl = baseurlService.address;

        itemService.setUploadStatus = function(x) {
          itemService.upload.done = x;
        };

        itemService.getUploadStatus = function() {
          return itemService.upload.done;
        };

        /**
         * id.set
         * @param {string} id
         */
        itemService.id.set = function(id) {
          itemService.id._id=id;
        };

        /**
         * id.get
         * @returns {string}
         */
        itemService.id.get = function() {
          return itemService.id._id;
        };

        itemService.list = {};
        itemService.list.fetch = {};

        /**
         * goToOffers
         * @param {string} listingId
         * @returns {object} redirect to route
         */
        itemService.goToOffers = function(listingId) {
          $state.go("home.offer", {
            id: listingId
          });
        };

        /**
         * list.fetch.all
         * @param {number} start
         * @param {number} rows
         * @returns {callback}
         */
        itemService.list.fetch.all = function(start, rows, sort) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listings/search/all",
            data:{
              start:start,
              rows:rows,
              type:'Listing',
              sort:sort
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        itemService.list.fetch.user = {};

        /**
         * list.fetch.user.all
         * @param {number} start
         * @param {number} rows
         * @returns {callback}
         */
        itemService.list.fetch.user.all = function(start, rows) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listings/search/user/all",
            data:{
              start:start,
              rows:rows,
              type:'Listing'
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * afterSave
         * @returns {callback}
         */
        itemService.afterSave = function() {
          return $state.go('profile.items');
        };

        /**
         * view
         * @param {object} listing
         * @returns {callback}
         */
        itemService.view = function(listing) {
          var id = typeof(listing.id)==='undefined' ? listing._id : listing.id;
          return $state.go("home.item", {id:id});
        };

        /**
         * list.fetch.freetext
         * @param {string} term
         * @param {number} start
         * @param {number} rows
         * @returns {callback}
         */
        itemService.list.fetch.freetext = function(term, start, rows, sort) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listing/search/freetext",
            data:{
              term:term,
              start:start,
              rows:rows,
              type:'Listing',
              sort:sort
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * list.fetch.featured
         * @param {string} term
         * @param {number} start
         * @param {number} rows
         * @returns {callback}
         */
        itemService.list.fetch.featured = function(term, start, rows) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listing/search/freetext",
            data:{
              term:term,
              start:start,
              rows:rows,
              type:'Listing'
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * fetch
         * @returns {callback}
         */
        itemService.fetch = function(id){
          console.log('itemservice.fetch.id: ', id);
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/listings/view/" + id,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        itemService.cart = {};
        itemService.cart.item = {};
        itemService.cart.add = function(quantity) {
          if (authFactory.isUserLogged()) {
            cartService.items.db.add(itemService.id.get(), quantity).then(
              function(resp) {
                // return $state.go('home.cart');
                return true;
              },
              function(resp) {
                console.log(resp);
              }
            );
          } else {
            $state.go('login');
          }
        };

        itemService.image = {};
        itemService.images = {};
        itemService.image._image = {};
        itemService.images._images = [];
	
        /**
         * image.set
         * @param {object} img
         */
        itemService.image.set = function(img) {
          itemService.image._image.base64data = img.base64data;
          itemService.image._image.id = img.id;
        };
        /**
         * image.get
         * @returns {object}
         */
        itemService.image.get = function() {
          return itemService.image._image;
        };

        itemService.images.set = function(images) {
          itemService.images._images = images;
        };

        itemService.images.get = function(images) {
          return itemService.images._images;
        };

        itemService.images.update = function(image) {
          itemService.images._images.push({
            url: image.url
          });
        };

        itemService.model = {};

        itemService.model.update = function(model) {
          console.log(model);
          for(var key in model) {
            if(key === "images") {
              itemService.model._model[key] = profileDetailsService.images._images;
            } else {
              itemService.model._model[key] = model[key];
            }
          }
          itemService.model._model = model;
        };

        var fields = [
          {name:'mainCategory', value:''},
          {name:'subcategory1', value:''},
          {name:'subcategory2', value:''},
          {name:'category0', value:''},
          {name:'category1', value:''},
          {name:'category2', value:''},

          {name:'categories', value:[]},
          {name:'postedByUserId', value:{_id:'', username:'', feedbackAverage:0, profileImage:''}},
          {name:'postedDate', value:''},
          {name:'numToSell', value:0},
          {name:'leftToBuy', value:0},
          {name:'_id', value:''},
          {name:'isUserWatching', value:false},

          {name:'title', value:''},
          {name:'ourPrice', value:0.0, currency:true},
          {name:'originalPrice', value:0.0, currency:true},
          {name:'isAcceptingOffers', value:false},
          {name:'lowestOffer', value:0.0, currency:true},
          {name:'condition', value:'New'},
          {name:'conditionDetails', value:''},
          {name:'countryOfManufacture', value:'US'},
          {name:'isHandcrafted', value:false},
          {name:'sku', value:''},
          {name:'description', value:''},
          {name:'watchingUserIds', value:[]},
          {name:'thumbnails', value:[]},
          {name:'images', value:[]},
          {name:'youtubeLink', value:''},
          {name:'inStock', value:0},
          {name:'isFreeShipping', value:false},
          {name:'flatShippingRate', value:0.0, currency:true},
          {name:'hasReturnPolicy', value:false},
          {name:'returnPolicy', value:0},
          {name:'postedDate', value:''},
          {name:'options', value:{showcase:false, highlight:false, boldface:false, viewCounter:false}},
          {name:'viewCount', value:{authenticated:0, notAuthenticated:0}}
        ];

        var options_fields = [
          {name:'showcase', value:false},
          {name:'highlight', value:false},
          {name:'boldface', value:false},
          {name:'viewCounter', value:false}
        ];

        itemService.cropper = {};
        itemService.cropper._isVisible = false;
        itemService.cropper.isVisible = function() {
          return itemService.cropper._isVisible;
        };
        itemService.cropper.hide = function() {
          itemService.cropper.isVisible=false;
        };
        itemService.cropper.display = function() {
          itemService.cropper.isVisible=true;
        };

        /**
         * init
         */
        itemService.init = function() {
          for (var i = 0; i < fields.length; i++) {
            var name = fields[i].name;
            var value = fields[i].value;
            if (angular.isObject(value)) {
              itemService.model._model[name] = {};
              angular.copy(value, itemService.model._model[name]);
            } else {
              itemService.model._model[name] = value;
            }
          }
        };

        /**
         * reset
         */
        itemService.model.reset = function() {
          console.log('itemService.model.reset');
          itemService.model._model = {};
          itemService.model._model.options = {};
          imageService.images.reset();
          itemService.init();
        };

        itemService.model.reset();

	/**
	 * model.set
	 * @param {object} model
	 */
	itemService.model.set = function(model, mode) {
	  for (var i=0; i<fields.length; i++) {
	    var name = fields[i].name;
	    if (name in model) {
	      if (fields[i].select===true && model[name].value) {
		itemService.model._model[name] = model[name].value;
	      } else {
		itemService.model._model[name] = angular.copy(model[name]);
                console.log('model.set', name, model[name]);
	      }
	      if (fields[i].currency) {
		itemService.model._model[name] = typeof(mode)==='undefined' ? (model[name]/100) : (model[name]);
	      }
	      if (name==='_id' || name==='id') {
		itemService.id.set(model[name]);
	      }
	    }
	  }
	  for (var j=0; j < options_fields.length; j++) {
	    var optionName = options_fields[j].name;
	    if (optionName in model.options) {
	      if (options_fields[j].select===true && model.options[optionName].value) {
		itemService.model._model.options[optionName] = model.options[optionName].value;
	      } else {
		itemService.model._model.options[optionName] = model.options[optionName];
	      }
	    }
	  }
	  if (model.categories && model.categories.length>=3) {
	    itemService.model._model.category0 = categoryService.categories.lookup(model.categories[0]._id, categoryService.categories._categories).toString();
	    itemService.model._model.category1 = categoryService.categories.lookup(model.categories[1]._id, categoryService.categories._categories).toString();
	    itemService.model._model.category2 = categoryService.categories.lookup(model.categories[2]._id, categoryService.categories._categories).toString();
	    console.log(itemService.model._model);
	  }
	  itemService.model._model.category = {
	    main : categoryService.categories.select(model.category0).main,
	    sub : categoryService.categories.select(model.category0, model.category1).sub,
	    subsub : categoryService.categories.select(model.category0, model.category1, model.category2).subsub
	  };
	};
	
        /**
         * created
         * @returns {callback}
         */
        itemService.create = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listings/add",
            data: itemService.model.get(),
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * update
         * @returns {callback}
         */
        itemService.update = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listings/save",
            data: itemService.model.get(),
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * itemService.remove
         * @returns {callback}
         */
        itemService.remove = function() {
          return $http({
            method: "DELETE",
            url: baseUrl+"/rtapi/v1/listings",
            data: {_id:itemService.id.get()},
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * model.get
         * @returns {object}
         */
        itemService.model.get = function() {
          return angular.copy(itemService.model._model);
        };

        itemService.init();

        return itemService;
      }
    ]
  );
})(console, angular);
