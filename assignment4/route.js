(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'home.html'
  })

  //Premade list page
  .state('categories', { // tu home vaoo categories state, tu day vao datamenu.template.html
    url: '/categories',
    templateUrl: 'datamenu.template.html',
    controller: 'dataMenuController as categoriesList',
    resolve: {
      categories: ['menuDataService', function (menuDataService) {
        return menuDataService.getAllCategories();
      }]
    }
  })

  .state('itemDetail', {
    url: '/item-detail/{itemId}-means-{itemname}', //has to inject all params we use, we can write whatever like {itemId}={itemname 
    templateUrl: 'items.html',               //{itemId}+ or - or & or whatever {itemname}, it works as long as we list all params
    controller: "CategoryDetailController as categoryDetail",
    resolve: {
      items: ['$stateParams', 'menuDataService', // cac tham so can phai them vao
            function ($stateParams, menuDataService) {
              //console.log($stateParams.itemId +"va"+ $stateParams.itemname);
              return menuDataService.getItemsForCategory($stateParams.itemId,$stateParams.itemname);
               
            }]
    }
  });

}

})();
