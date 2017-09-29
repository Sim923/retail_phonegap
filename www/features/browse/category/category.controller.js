/**
 * @fileOverview browse view controller
 * @name category.controller.js
 * @author Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com> (http://www.anomalistdesign.com)
 * @license UNLICENSED
 */
(function (console, angular) {
  'use strict';
  var RTMobileApp = angular.module('RTMobileApp');
  RTMobileApp.controller(
    'browse.category.controller',
    [
      '$log',
      '$state',
      'categories',
      'listings',
      'categoryService',
      'browseCategoryService',
      '$timeout',
      'itemService',
      'adventureService',
      function($log, $state, categories, listings, categoryService, browseCategoryService, $timeout, itemService, adventureService) {

        var oListings = listings ? angular.copy(listings.data) : []; 
      	var name = "";
      	var _categories=[];
      	var id = "";
        var selectedCategory={};
        var output = {
          list:oListings,
          count:oListings.length,
          loading:false
        };

        var $this=this;

        $this.step = 0;

        var sort = {};
        sort.options=[];
        sort.selected = {field:"postedDate", direction:"desc"};

        var changeSort = function(option, setup) {
          console.log('changeSort', option);
          if (option==="low-to-high") {
            sort.selected = browseCategoryService.type==="Listing" ? {field:"ourPrice", direction:"asc"} : {field:"price", direction:"asc"} ;
          } else if (option==="high-to-low") {
            sort.selected = browseCategoryService.type==="Listing" ? {field:"ourPrice", direction:"desc"} : {field:"price", direction:"desc"} ;
          } else {
            sort.selected = {field:"postedDate", direction:"desc"};
          }

          var options = [
            { text:"Most Recent First", click:"most-recent"},
            { text:"Price Low to high", click:"low-to-high"},
            { text:"Price High to Low", click:"high-to-low"}
          ];
          sort.options=[];
          for (var i=0; i < options.length; i++) {
            var text = "<i class='fa fa-fw ";
            if (option==options[i].click) {
              text += "fa-check";
            } else {
              text += "text-muted";
            }
            text += " '></i>&nbsp;";
            text += options[i].text;
            var click = "bcc.changeSort('" + options[i].click + "')";
            console.log(text, click);
            sort.options.push({
              "text": text,
              "click": click
            });
          }
          if (typeof(setup)==="undefined") {
            selectedCategory = browseCategoryService.selected.get();
            var id = selectedCategory.main._id;
            id = selectedCategory.sub==="" ? id : selectedCategory.sub._id;
            id = selectedCategory.subsub==="" ? id : selectedCategory.subsub._id;
            change(id);
          }
        };

        


        

        /**
         * change
         * @param {string} id
         */
        var change = function(id) {
          console.log('change', id);
          output.list=[];
          output.count=0;
          var searching = true;
          var result = {main:'', sub:'', subsub:''};
          console.log('categories', categories.data);
          for (var x=0; x < categories.data.length && searching; x++) {
            var o = categories.data[x];
            if (o._id==id) {
              result.main=o;
              result.sub='';
              result.subsub='';
            } 
            searching = (o._id!==id); console.log('searching', searching);
            for (var y=0; y < o.subcategories.length && searching; y++) {
              var m = o.subcategories[y];
              if (m._id==id) {
                result.main = o;
                result.sub = m;
                result.subsub = '';
              }
              searching = (m._id!==id); console.log('searching', searching);
              for (var z=0; z < m.subcategories.length && searching; z++) {
                var n = m.subcategories[z];
                if (n._id==id) {
                  result.main = o;
                  result.sub = m;
                  result.subsub = n;
                }
                searching = (n._id!==id); console.log('searching', searching);
              }
            }
          }
          browseCategoryService.all = !(result.main || result.sub || result.subsub);
          console.log('result', id, result);
          browseCategoryService.selected.set(result.main, result.sub, result.subsub);
          buildDropdown();
          console.log('sort.selected', sort.selected);
          browseCategoryService.update(sort.selected).then(
            function(resp) {
              console.log('browseCategoryService.update', resp.data.docs, resp.data.docs.length);
              for (var i=0;  i < resp.data.docs.length; i++) {
                console.log('push', i);
                $this.output.list.push(resp.data.docs[i]);
              }
            },
            function(resp) {
              console.log('error', resp);
            }
          );
        };

        

        /**
         * convertCurrency
         * @param {number} amount
         * @returns {number} 
         */
        var convertCurrency = function(amount) {
          return (amount / 100);
        };

        var dropdown = [
        ];

      

        /**
         * buildDropdown
         */
        var buildDropdown = function() {
          selectedCategory = browseCategoryService.selected.get();
          console.log('selectedCategory', selectedCategory);
          dropdown.splice(0, dropdown.length);
//          dropdown.push({text:'<i class="fa fa-fw' + (selectedCategory.main==='' ? ' fa-check text-muted':'') + '"></i>All Gear', click:'bcc.change()', active:(selectedCategory==='')});
//          dropdown.push({divider:true});
          if (selectedCategory.main==='') {
            for (var i=0; i<categories.data.length; i++) {
              var o=categories.data[i];
              dropdown.push({text:'<i class="fa fa-fw"></i>' + o.name, click:'bcc.change(\'' + o._id + '\')', active:false});
            }
          } else {
            dropdown.push({text:'<i class="fa fa-fw' + (selectedCategory.sub==='' ? ' fa-check text-muted':'') + '"></i>All ' + selectedCategory.main.name, click:'bcc.change(\''+selectedCategory.main._id+'\')', active:(selectedCategory.sub==='')});
            dropdown.push({divider:true});
            if (selectedCategory.sub==='') {
              for (var j=0; j<selectedCategory.main.subcategories.length; j++) {
                var m=selectedCategory.main.subcategories[j];
                dropdown.push({text:'<i class="fa fa-fw"></i>' + m.name, click:'bcc.change(\'' + m._id + '\')', active:false});
              }
            } else {
              dropdown.push({text:'<i class="fa fa-fw' + (selectedCategory.subsub==='' ? ' fa-check text-muted':'') + '"></i>All ' + selectedCategory.sub.name, click:'bcc.change(\''+selectedCategory.sub._id+'\')', active:(selectedCategory.subsub==='')});
              dropdown.push({divider:true});
              if (selectedCategory.subsub==='') {
                for (var k=0; k < selectedCategory.sub.subcategories.length; k++) {
                  var n=selectedCategory.sub.subcategories[k];
                  dropdown.push({text:'<i class="fa fa-fw"></i>' + n.name, click:'bcc.change(\'' + n._id + '\')', active:false});
                }
              } else {
                dropdown.push({text:'<i class="fa fa-fw fa-check text-muted"></i>All ' + selectedCategory.subsub.name, click:'bcc.change(\'' + selectedCategory.subsub._id + '\')', active:true});
              }              
            }
          }
        };

     
        var doNotLoadMore = true;
        var loadMore = function() {
          if(doNotLoadMore) {
            $timeout(function() {
              doNotLoadMore = false;
            }, 10);
          }
          if (doNotLoadMore || output.loading || listings.numFound <= 0 || listings.numFound <= browseCategoryService.rows) return;
          output.loading = true;
          var idLvl0 = browseCategoryService.selected.get().main==='' ? '' : browseCategoryService.selected.get().main._id;
          var idLvl1 = browseCategoryService.selected.get().sub==='' ? '' : browseCategoryService.selected.get().sub._id;
          var idLvl2 = browseCategoryService.selected.get().subsub==='' ? '' : browseCategoryService.selected.get().subsub._id;
          switch (browseCategoryService.type) {
            case "Listing":
            if (browseCategoryService.all) {
              itemService.list.fetch.all(browseCategoryService.start, browseCategoryService.rows).then(
                function(resp) {
                  browseCategoryService.selected.set(idLvl0, idLvl1, idLvl2);
                  for(var i=0;i<resp.data.data.docs.length;i++) {
                    if(output.count < resp.data.data.numFound) {
                      output.list.push(resp.data.data.docs[i]);
                      output.count++;
                    }
                  }
                  browseCategoryService.start = output.count;
                  output.loading = false;
                },
                function(resp) {
                  output.loading = false;
                }
              );
            } else {
              categoryService.listing.fetch(idLvl0, idLvl1, idLvl2, browseCategoryService.start, browseCategoryService.rows).then(
                function(resp) {
                  console.log("loading more... OK: ");
                  browseCategoryService.selected.set(idLvl0, idLvl1, idLvl2);
                  console.log(resp.data.data.docs);
                  for(var i=0;i<resp.data.data.docs.length;i++) {
                    if(output.count < resp.data.data.numFound) {
                      output.list.push(resp.data.data.docs[i]);
                      output.count++;
                    }
                  }
                  browseCategoryService.start = output.count;
                  output.loading = false;
                },
                function(resp) {
                  output.loading = false;
                }
              );
            }
            break;
            case "Adventure":
            if (browseCategoryService.all) {
              adventureService.list.fetch.all(browseCategoryService.start, browseCategoryService.rows).then(
                function(resp) {
                  console.log("loading more... OK: ");
                  browseCategoryService.selected.set(idLvl0, idLvl1, idLvl2);
                  for(var i=0;i<resp.data.data.docs.length;i++) {
                    if(output.count < resp.data.data.numFound) {
                      output.list.push(resp.data.data.docs[i]);
                      output.count++;
                    }
                  }
                  browseCategoryService.start = output.count;
                  output.loading = false;
                },
                function(resp) {
                  output.loading = false;
                }
              );
            } else {
              idLvl0=categoryService.categories._categories[5]._id;
              categoryService.listing.fetch(idLvl0, idLvl1, idLvl2, start, rows).then(
                function(resp) {
                  console.log("loading more... OK: ");
                  browseCategoryService.selected.set(idLvl0, idLvl1, idLvl2);
                  console.log(resp.data.data.docs);
                  for(var i=0;i<resp.data.data.docs.length;i++) {
                    if(output.count < resp.data.data.numFound) {
                      output.list.push(resp.data.data.docs[i]);
                      output.count++;
                    }
                  }
                  browseCategoryService.start = output.count;
                  output.loading = false;
                },
                function(resp) {
                  output.loading = false;
                }
              );
            }
            break;
          }
        };

        /**
         * select
         * @param {string} id
         */
        var select=function(id) {
          var type=browseCategoryService.type;
          console.log(type);
          if (type==='Listing') {
            $state.go('home.item',{id:id});
          } else {
            $state.go('home.adventure',{id:id});
          }
        };

        var makeActive = function(value){
          $this.step = value;
        }

        /**
         * init
         */
	var init = function() {
	  $log.log('browse.category.controller.init');
          console.log('activeTab', browseCategoryService.activeTab);
          buildDropdown();
          changeSort('most-recent', true);
	};

	init();

	// Exports
	console.log(output.list);
	angular.extend(this, {
          output:output,
          listings:output.list,
          categories:categories.data,
          dropdown:dropdown,
          sort:sort,
          change:change,
          changeSort:changeSort,
          convertCurrency:convertCurrency,
          selectedCategory:selectedCategory,
          select:select,
          loadMore:loadMore,
          makeActive:makeActive
	});
      }
    ]
  );
})(console, angular);
