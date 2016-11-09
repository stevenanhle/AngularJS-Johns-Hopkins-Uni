(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })

    .state('menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',// cai nay phai trung voi cai ben menu.html
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          console.log(MenuService.getCategories());
          return MenuService.getCategories();
        }]
      }
    })

    .state('menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('cussignup', {
      url: '/signup',
      templateUrl: 'src/customer/signup.html',
      controller: 'CustomerSignUpController',
      
    })

    .state('cusinfor', {
      url: '/cusinfor',
      templateUrl: 'src/customer/infor.html',
      controller: 'CustomerInforController',
      
    });
}
})();
