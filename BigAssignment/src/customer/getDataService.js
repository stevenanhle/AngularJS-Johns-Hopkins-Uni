(function () {
"use strict";

angular.module('customer')
.service('GetDataService', GetDataService)


GetDataService.$inject = ['$http'];
function GetDataService($http)
{
  return $http.get('https://my-restaurant.herokuapp.com/menu_items.json').then(function (response)
                 {
                     return response.data.menu_items;
                 });

}


})();