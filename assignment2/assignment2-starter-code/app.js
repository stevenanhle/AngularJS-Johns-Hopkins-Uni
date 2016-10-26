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
  tobuy.addItem=function(itemIndex){ ShoppingListCheckOffService.addItem(itemIndex);};
   
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService','$scope'];
function AlreadyBoughtController(ShoppingListCheckOffService, $scope) {
  var alreadyBought = this;
 
  alreadyBought.myList = ShoppingListCheckOffService.getBoughtItems();
  
      

      
}


function ShoppingListCheckOffService() {
  var service = this;

  
  // List of shopping items
  var tobuyitems = [{name: "cookies", quantity: 10 },{name: "soda bottles", quantity: 20 },{name: "pen", quantity: 8},{name: "books", quantity: 15}
                   ,{name:"orange", quantity: 2}];
  var boughtitems =[];
  
  service.addItem = function (itemIndex) {
    var item = tobuyitems[itemIndex];
    boughtitems.push(item);
    tobuyitems.splice(itemIndex, 1);
  };

  

  

  service.getBoughtItems = function () {
    return boughtitems;
  };

  service.getToBuyItems = function () {

    return tobuyitems;
  };
}

})();
