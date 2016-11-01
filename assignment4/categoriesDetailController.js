(function () {
'use strict';

angular.module('dataMenu')
.controller('CategoryDetailController', CategoryDetailController);

CategoryDetailController.$inject = ['items', 'menuDataService'];
function CategoryDetailController(items,menuDataService) {
  var itemlist = this;
  itemlist.items= items;
  itemlist.ctgrName= menuDataService.getNameofCategory();
  //console.log("items are" +items);
}

})();
