(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);



ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tobuy = this;
  tobuy.myList=ShoppingListCheckOffService.getToBuyItems();
  tobuy.addItem=function(itemIndex){ ShoppingListCheckOffService.addItem(itemIndex);
  tobuy.isToBuyEmpty=ShoppingListCheckOffService.isToBuyEmpty();};
   
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService','$scope'];
function AlreadyBoughtController(ShoppingListCheckOffService, $scope) {
  var alreadyBought = this;
 
  alreadyBought.myList = ShoppingListCheckOffService.getBoughtItems();
  alreadyBought.isBoughtEmpty=ShoppingListCheckOffService.isBoughtEmpty();
      

      
}


function ShoppingListCheckOffService() {
  var service = this;

  
  // List of shopping items
  var tobuyitems = [{name: "cookies", quantity: 10 },{name: "soda bottles", quantity: 20 },{name: "pen", quantity: 8},{name: "books", quantity: 15} ];
  var boughtitems =[];
  
  service.addItem = function (itemIndex) {
    var item = tobuyitems[itemIndex];
    boughtitems.push(item);
    tobuyitems.splice(itemIndex, 1);
  };

  service.isBoughtEmpty=function(){
    if(boughtitems.length>0)
     {
      return true;
     }
    else
      return false;
  };

  service.isToBuyEmpty=function(){
     if(tobuyitems.length>0)
     {
      
      return false;
     }
    else
      return true;
  };

  service.getBoughtItems = function () {
    return boughtitems;
  };

  service.getToBuyItems = function () {

    return tobuyitems;
  };
}

})();
