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
      foundList: '<',// foundList is used in foundItems.html and found-list is used in index.html
      onRemove: '='
    },
    controller: SearchDirectiveController,
    controllerAs: 'ourlist',// ourlist is used in SearchDirectiveLink and foundItems.html
    bindToController: true,
    link: SearchDirectiveLink

  };

  return ddo;
}

function SearchDirectiveLink(scope, element) {
  
  scope.$watch('ourlist.nothingMatch()', function (newValue, oldValue) {


    if (newValue === true) {
      displayNothing();
    }
    else {
      removeNothing();
    }

  });

  function displayNothing() {

    var warningElem = element.find("div.nothing");
    warningElem.slideDown(10);
  }


  function removeNothing() {
    var warningElem = element.find("div.nothing");
    warningElem.slideUp(10);
  }
}


function SearchDirectiveController() {
  var list = this;
  list.nothingMatch = function () {
    
    
  }; 
}//end of SearchDirectiveController



NarrowItDownController.$inject = ['MenuCategoriesService'];
function NarrowItDownController(MenuCategoriesService) {
  var menu = this;
 
  menu.oneList =  MenuCategoriesService.getSortedItems();
  menu.notFound=  MenuCategoriesService.getNotFound();
  menu.Search = function (searchTerm) {
                  MenuCategoriesService.getMatchedMenuItems(searchTerm);
                  menu.notFound=MenuCategoriesService.getNotFound();
                  };//end of Search function

  menu.removeItem = function(index){MenuCategoriesService.removeItem(index)};


}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath']
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;
  var firstList=[];
  
  var notFound = false;// false if the page is refesh or nothing match after search button clicked

  service.getAllItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };//end
  
  service.getMatchedMenuItems = function(searchTerm){
    var promise = service.getAllItems();
    firstList.splice(0,firstList.length);
    promise.then(function (response) {
      
      var items = response.data.menu_items;
      var i =0;
      for(i=0; i<items.length; i++)
      {
        var desc=items[i].description.toLowerCase();
        if(searchTerm.trim('')!==""&&desc.includes(searchTerm.toLowerCase())==true)
          firstList.push(items[i]);
      }
      if(firstList.length>0)
        notFound=true;
    })
  }//end

  service.getSortedItems = function() {return firstList}//end
  service.removeItem=function(index){
    firstList.splice(index,1);
    }//end

  service.getNotFound = function(){return notFound}//end


}

})();

