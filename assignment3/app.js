(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuCategoriesService', MenuCategoriesService)
.directive('foundItems',FoundItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

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
 

  menu.foundList = [];

  menu.Search = function (searchTerm) {
    var promise = MenuCategoriesService.getMatchedMenuItems();
    promise.then(function (response) {
      menu.foundList = [];
      var searchList=[];
      var items = response.data.menu_items;
      var i =0;
      for(i=0; i<items.length; i++)
      {
        var desc=items[i].description.toLowerCase();
        if(desc.includes(searchTerm.toLowerCase())==true)
          searchList.push(items[i]);
      }
      menu.foundList = searchList;
      searchList=[];

    })
  };//end of Search function

  menu.removeItem = function(index)
  {
    menu.foundList.splice(index,1);
    console.log(menu.foundList);
  }

}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath']
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;
  

  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };

}

})();

