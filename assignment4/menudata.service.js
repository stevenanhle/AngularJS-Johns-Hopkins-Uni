(function () {
'use strict';

angular.module('dataMenu')
.service('menuDataService', menuDataService);


menuDataService.$inject = ['$http']
function menuDataService($http) {
  var service = this;
  service.categories=[];
  service.allItems =[];
  service.nameofCategory="";

  // List of shopping items
  
  service.getAllCategories = function () {
     return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/categories.json")
    }).then(function(response){
        service.categories=response.data;
        return service.categories;
      })//end of then
  };//end of getAllCategories

  service.getItemsForCategory =function(categoryShortName, ctgrName){
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName)
    }).then(function(response){
        service.allItems=response.data.menu_items;
        service.nameofCategory=ctgrName;
        return service.allItems;
      })//end of then

  }//end of getItemsForCategory

  service.getNameofCategory = function(){
    //console.log("nameofCategory is "+service.nameofCategory);
    return service.nameofCategory;}

}//end of menuDataService

})();//end of function 
