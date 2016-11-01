(function () {
'use strict';

angular.module('dataMenu')
.controller('dataMenuController', dataMenuController);

dataMenuController.$inject = ['menuDataService', 'categories'];
function dataMenuController(menuDataService, categories) {
  var categorylist = this; 
  categorylist.categories = categories;//categories o ve phai la categories tu file route
  // categoriesList.categories gio co gia tri la categorylist.categories , quay lai file datamenu.template
  
}

})();
