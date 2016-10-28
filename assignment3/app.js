(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuCategoriesService', MenuCategoriesService)
.directive('foundItems',FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
     scope: {
      foundList: '<',// foundlist o day phai trung ten voi list trong shongppingList.html, trong index.html va NarrowItDownController
      onRemove: '='
    },
    controller: ShoppingListDirectiveController,
    controllerAs: 'ourlist',
    bindToController: true
  };

  return ddo;
}

function ShoppingListDirectiveController() {
  
}


NarrowItDownController.$inject = ['MenuCategoriesService'];
function NarrowItDownController(MenuCategoriesService) {
  var menu = this;
  menu.searchTerm="";
  menu.notFound=false;
  menu.matchedList = [];

  menu.Search = function (searchTerm) { 
    menu.deleteAll = false;
    var promise = MenuCategoriesService.getMatchedMenuItems(searchTerm);
    promise.then(function (response) {
      menu.matchedList=response;
      if(response.length>0)
        menu.notFound=false;
      else
        menu.notFound=true;
    })
  };//end of Search function

  menu.removeItem = function(index) {MenuCategoriesService.removeItem(index);     
                                     if(menu.matchedList.length>0)
                                      menu.deleteAll =false;
                                     else
                                      menu.deleteAll=true;};
  
}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath']
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;
  service.list =[];
  
  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(response){
        service.list.splice(0,service.list.length);
        var items = response.data.menu_items;
        var i =0;
        for(i=0; i<items.length; i++)
        {
          var desc=items[i].description.toLowerCase();
          if(desc.includes(searchTerm.toLowerCase())==true &&searchTerm.trim('')!=="")
            service.list.push(items[i]);
        }
        return service.list;
      })
  };//end

  service.removeItem = function(index)
  {
    service.list.splice(index,1);
 
  }

}

})();

