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
  menu.notFound=false;
  menu.deleteAll = false;
  menu.matchedList= [];
  menu.searchTerm="";
  menu.Search = function (searchTerm) {
                  menu.deleteAll = false;
                  MenuCategoriesService.getMatchedMenuItems(searchTerm).then(function(response){
                    menu.matchedList=response;
                    if(response.length>0)
                        menu.notFound=false;
                     else
                        menu.notFound=true;
                  })
          };//end of Search function

  menu.removeItem = function(index){ MenuCategoriesService.removeItem(index);
                                     if(menu.matchedList.length>0)
                                      menu.deleteAll =false;
                                     else
                                      menu.deleteAll=true;
                                   };


}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath']
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;
  service.firstList=[];

  service.getAllItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };//end
  
  service.getMatchedMenuItems = function(searchTerm){
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {
      service.firstList.splice(0,service.firstList.length);
      var items = response.data.menu_items;
      var i =0;
      for(i=0; i<items.length; i++)
      {
        var desc=items[i].description.toLowerCase();
        if(searchTerm.trim('')!==""&&desc.includes(searchTerm.toLowerCase())==true)
          service.firstList.push(items[i]);
      }
        return service.firstList;
    })// end of then

  }//end

  //service.getSortedItems = function() {return firstList}//end
  service.removeItem=function(index){
    service.firstList.splice(index,1);
    }//end



}

})();