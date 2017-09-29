/**
 * @fileOverview Adventure wizard service
 * @name register.service.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */

(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.factory(
    'adventureService',
    [
      '$log',
      '$http',
      'imageService',
      'categoryService',
      'baseurlService',
      function($log, $http, imageService, categoryService, baseurlService) {

        var adventureService = {};
        adventureService.image = {};
        adventureService.images = {};
        adventureService.image._image = '';
        adventureService.images._images = [];
        var baseUrl = baseurlService.address;
        /**
         * image.set
         * @param {object} img
         */
        adventureService.image.set = function(img) {
          adventureService.image._image = img;
        };
        /**
         * image.get
         * @returns {object}
         */
        adventureService.image.get = function() {
          return adventureService.image._image;
        };

        adventureService.images.set = function(images) {
          adventureService.images._images = images;
        };

        adventureService.images.get = function(images) {
          return adventureService.images._images;
        };

        adventureService.images.update = function(image) {
          adventureService.images._images.push({
            url: image.url
          });
        };

        /**
         * afterSave
         * @returns {callback}
         */
        adventureService.afterSave = function() {
        };

        adventureService.model = {};

        var fields = [
          {name:'_id', value:''},
          {name:'isActive', value:''},
          {name:'mainCategory', value:''},
          {name:'subcategory1', value:''},
          {name:'subcategory2', value:''},
          {name:'category0', value:'5'},
          {name:'category1', value:''},
          {name:'category2', value:''},
          {name:'categories', value:[]},
          {name:'cats', value:[]},
          {name:'title', value:''},
          {name:'price', value:0.0, currency:true},
          {name:'days', value:0.0},
          {name:'listingDays', value:1},
          {name:'postedDate', value:''},
          {name:'intensity', value:1},
          {name:'description', value:''},
          {name:'thumbnails', value:[]},
          {name:'youtubeLink', value:''},
          {name:'postedByUserId', value:{_id:'', username:''}},
          {name:'images', value:[]},
          {name:'isGroup', value:false},
          {name:'groupSizeMin', value:1},
          {name:'groupSizeMax', value:1},
          {name:'location', value:{address:'', lat:0, lng:0}},
          {name:'options', value:{showcase:false, highlight:false, boldface:false, viewCounter:false}}
        ];

        var options_fields = [
          {name:'showcase', value:false},
          {name:'highlight', value:false},
          {name:'boldface', value:false},
          {name:'viewCounter', value:false}
        ];

        adventureService.cropper = {};
        adventureService.cropper._isVisible = false;
        adventureService.cropper.isVisible = function() {
          return adventureService.cropper._isVisible;
        };
        adventureService.cropper.hide = function() {
          adventureService.cropper.isVisible=false;
        };
        adventureService.cropper.display = function() {
          adventureService.cropper.isVisible=true;
        };

        /**
         * init
         */
        adventureService.init = function() {
          for (var i = 0; i < fields.length; i++) {
            var name = fields[i].name;
            var value = fields[i].value;
            if (angular.isObject(value)) {
              adventureService.model._model[name] = {};
              angular.copy(value, adventureService.model._model[name]);
            } else {
              adventureService.model._model[name] = value;
            }
          }
        };

        /**
         * reset
         */
        adventureService.model.reset = function() {
          console.log('adventureService.model.reset');
          adventureService.model._model = {};
          adventureService.model._model.options = {};
          imageService.images.reset();
          adventureService.init();
        };

        adventureService.model.reset();

        /**
         * model.set
         * @param {object} model
         */
          adventureService.model.set = function(model, mode) {
          console.log('adventureService.model.set', model);
          if (model.categories.length && typeof(model.categories.length)!=='undefined') {
            model.category0=model.categories[0];
            model.category1=model.categories[1];
            model.category2=model.categories[2];
          }
          for (var i=0; i<fields.length; i++) {
            var name = fields[i].name;
            if (name in model) {
              if (fields[i].select===true && model[name].value) {
                adventureService.model._model[name] = model[name].value;
                console.log('model[name].value', model[name].value);
              } else {
                adventureService.model._model[name] = angular.copy(model[name]);
                console.log('model[name]', model[name]);
              }
              if (fields[i].currency) {
                adventureService.model._model[name] = typeof(mode)==='undefined' ? (model[name]/100) : (model[name]);
              }
            }
          }
          for (var j=0; j < options_fields.length; j++) {
            var optionName = options_fields[j].name;
            if (optionName in model.options) {
              if (options_fields[j].select===true && model.options[optionName].value) {
                adventureService.model._model.options[optionName] = model.options[optionName].value;
              } else {
                adventureService.model._model.options[optionName] = model.options[optionName];
              }
            }
          }
          if (typeof(adventureService.model._model.category)==='undefined') {
            adventureService.model._model.category = {
              main : categoryService.categories.select(model.category0).main,
              sub : categoryService.categories.select(model.category0, model.category1).sub,
              subsub : categoryService.categories.select(model.category0, model.category1, model.category2).subsub
            };
          } else {
            adventureService.model._model.category = model.category;
          }
          console.log(model);
          if (model.categories.length && typeof(model.categories.length)!=='undefined') {
            var idx0=-1;
            var idx1=-1;
            var idx2=-1;
            var c0={};
            var id0=model.categories[0]._id;
            for (var m=0; m<categoryService.categories._categories.length; m++) {
              if (categoryService.categories._categories[m]._id==id0) {
                idx0=m;
                model.category0=idx0;
                adventureService.model._model.category0 = idx0.toString();
                c0=categoryService.categories._categories[m];
                break;
              }
            }
            var c1={};
            var id1=model.categories[1]._id;
            for (var l=0; l<c0.subcategories.length; l++) {
              if (c0.subcategories[l]._id==id1) {
                idx1=l;
                adventureService.model._model.category1 = idx1.toString();
                model.category2=""+idx1;
                c1=c0.subcategories[l];
                break;
              }
            }
            var id2=model.categories[2]._id;
            for (var k=0; k<c1.subcategories.length; k++) {
              if (c1.subcategories[k]._id==id2) {
                idx2=k;
                adventureService.model._model.category2 = idx2.toString();
                model.category2=""+idx2;
                break;
              }
            }
            adventureService.model._model.mainCategory = id0;
            adventureService.model._model.subcategory1 = id1;
            adventureService.model._model.subcategory2 = id2;
          }
          console.log(model);
        };

        adventureService.id = {};
        adventureService.id._id='';
        adventureService.id.set = function(id) {
          adventureService.id._id=id;
        };

        adventureService.id.get = function() {
          return adventureService.id._id;
        };

        adventureService.list = {};
        adventureService.list.fetch = {};

        /**
         * list.fetch.all
         * @param {number} start
         * @param {number} rows
         * @returns {callback}
         */
        adventureService.list.fetch.all = function(start, rows, sort) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/adventures/search/all",
            data:{
              start:start,
              rows:rows,
              sort:sort
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        adventureService.list.fetch.user = {};

        adventureService.list.fetch.user.all = function(start, rows) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/adventures/search/user/all",
            data:{
              start:start,
              rows:rows
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * list.fetch.freetext
         * @param {string} term
         * @param {number} start
         * @param {number} rows
         * @returns {callback}
         */
        adventureService.list.fetch.freetext = function(term, start, rows) {
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
         * list.fetch.featured
         * @param {string} term
         * @param {number} start
         * @param {number} rows
         * @returns {callback}
         */
        adventureService.list.fetch.featured = function(term, start, rows) {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/listing/search/freetext",
            data:{
              term:term,
              start:start,
              rows:rows,
              type:'Adventure'
            },
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        adventureService.fetch = function(){
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/adventures/view/" + adventureService.id.get(),
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * created
         * @returns {callback}
         */
        adventureService.create = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/adventures/add",
            data: adventureService.model._model,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * update
         * @returns {callback}
         */
        adventureService.update = function() {
          return $http({
            method: "POST",
            url: baseUrl+"/rtapi/v1/adventures/save",
            data: adventureService.model._model,
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * adventureService.remove
         * @returns {}
         */
        adventureService.remove = function() {
          return $http({
            method: "DELETE",
            url: baseUrl+"/rtapi/v1/adventures",
            data: {_id:adventureService.id.get()},
            headers: {
              "Content-Type": "application/json"
            }
          });
        };

        /**
         * fetchAdventureOptions
         * @param {string} adventureId
         * @returns {callback}
         */
        adventureService.fetchAdventureOptions = function(adventureId) {
          return $http({
            method: "GET",
            url: baseUrl+"/rtapi/v1/adventures/options/" + adventureId
          });
        };

        /**
         * model.get
         * @returns {object}
         */
        adventureService.model.get = function() {
          return angular.copy(adventureService.model._model);
        };

        adventureService.init();

        return adventureService;
      }
    ]
  );
})(console, angular);
