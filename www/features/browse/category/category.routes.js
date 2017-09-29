/**
 * @fileOverview Primary-level ui-routes configuration
 * @name app.routes.js
 * @author Matthew Aaron Raymer
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

	var categoryState = {
	  name: 'home.category',
	  url: '^/category',
          params:{
            type:null,
            all:null,
            idLvl0:null,
            idLvl1:null,
            idLvl2:null
          },
          data : {
            status : 'home'
          },
	  resolve : {
            categories:[
              '$window',
              '$injector',
              'categoryService',
              function($window, $injector, categoryService) {
                return categoryService.categories.fetch().then(
                  function(resp) {
                    categoryService.categories.set(resp.data);
                    return {status:true, data:resp.data};
                  },
                  function(resp) {
	            var isCordova = typeof($window.cordova)==="undefined" ? false : true;
	            var $cordovaDialogs = null;
	            if (isCordova) {
	              $cordovaDialogs = $injector.get('$cordovaDialogs');
                      $cordovaDialogs.alert(resp.data, "error", "ok");
	            }
                    return {status:false};
                  }
                );
              }
            ],
            listings: [
              '$stateParams',
              'browseCategoryService',
              'topService',
              'itemService',
              'adventureService',
	      'categoryService',
	      function($stateParams, browseCategoryService, topService, itemService, adventureService, categoryService) {
                var   type = (typeof($stateParams.type)==='undefined' || $stateParams.type===null) ? 'Listing' : $stateParams.type; console.log("type", type);
                var    all = (typeof($stateParams.all)==='undefined' || $stateParams.all===null) ? false : $stateParams.all; console.log("all", all);
                topService.all.set(all);
                browseCategoryService.type=type;
                browseCategoryService.all=all;
                var o = topService.data.get("back") || {}; console.log("back", o, $stateParams);
                var idLvl0 = o.stateParams ? o.stateParams.idLvl0 : $stateParams.idLvl0;
                var idLvl1 = o.stateParams ? o.stateParams.idLvl1 : $stateParams.idLvl1;
                var idLvl2 = o.stateParams ? o.stateParams.idLvl2 : $stateParams.idLvl2;
		console.log(idLvl0, idLvl1, idLvl2);
                var selectedId = idLvl2 || idLvl1 || idLvl0;
                if (selectedId) {
                  o = {state:"home.category", type:type, stateParams:$stateParams, category:{_id:selectedId}};
                } else {
                  o = {state:"home.category", type:type, stateParams:null, category:{_id:''}};
                }
                topService.data.set("back", o);
                switch (type) {
                  case "Listing":
                  if (all) {
                    return itemService.list.fetch.all(0, 12).then(
		      function(resp) {
                        console.log("Listing", resp.data.data.docs);
                        browseCategoryService.selected.set('', '', '');
		        return {status:true, data:resp.data.data.docs, start:resp.data.data.start, numFound:resp.data.data.numFound};
		      },
		      function(resp) {
                        console.log("Listing Error", resp.data.data.docs);
		        return {status:false, data:{}, start:0, numFound:0};
		      }
                    );
                  } else {
		    return categoryService.listing.fetch(idLvl0, idLvl1?idLvl1:'', idLvl2?idLvl2:'', browseCategoryService.start, browseCategoryService.rows).then(
		      function(resp) {
                        console.log("Listing All", resp.data.data.docs);
                        browseCategoryService.selected.set(idLvl0, idLvl1?idLvl1:'', idLvl2?idLvl2:'');
		        return {status:true, data:resp.data.data.docs, start:resp.data.data.start, numFound:resp.data.data.numFound};
		      },
		      function(resp) {
                        console.log("Error All", resp.data.data.docs);
		        return {status:false, data:{}, start:0, numFound:0};
		      }
                    );
                  }
                  break;
                  case "Adventure":
                  if (all) {
                    return adventureService.list.fetch.all(0, 12).then(
		      function(resp) {
                        console.log("Adventure", resp.data.data.docs);
                        browseCategoryService.selected.set('', '', '');
		        return {status:true, data:resp.data.data.docs, start:resp.data.data.start, numFound:resp.data.data.numFound};
		      },
		      function(resp) {
                        console.log("Adventure Error", resp.data.data.docs);
		        return {status:false, data:{}, start:0, numFound:0};
		      }
                    );
                  } else {
                    idLvl0=categoryService.categories._categories[5]._id;
		    return categoryService.listing.fetch(idLvl0, idLvl1, idLvl2?idLvl2:'', browseCategoryService.start, browseCategoryService.rows).then(
		      function(resp) {
			console.log("Adventure All", resp);
                        browseCategoryService.selected.set(idLvl0, idLvl1, idLvl2?idLvl2:'');
		        return {status:true, data:resp.data.data.docs, start:resp.data.data.start, numFound:resp.data.data.numFound};
		      },
		      function(resp) {
			console.log("Adventure error");
		        return {status:false, data:{}, start:0, numFound:0};
		      }
                    );
                  }
                  break;
                }
              }
	    ]
	  },
	  parent:'',
	  authenticate:false,
	  views:{
	    'content@':{
	      templateUrl:'features/browse/category/browse.category.html',
	      controller:'browse.category.controller',
	      controllerAs:'bcc'
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
	};
	$stateProvider.state(categoryState);
      }
    ]
  );
})(console, angular);
