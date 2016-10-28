/*global console, angular*/
/*jslint plusplus: true*/

(function () {
    
    "use strict";
    
    var narrowItDownApp,
        foundItemsDirective,
        narrowItDownController,
        menuSearchService;
    
    /**
     * Angular Found Items Directive !
     * @returns {object} Directive Definition Object !
     */
    foundItemsDirective = function () {
        
        var ddo,
            foundItemsController;
        
        /**
         * Controller for the Found Items Directive !
         */
        foundItemsController = function () {
            
            var vm = this;
            
        };
        
        // Inject the dependencies for foundItemsController !
        foundItemsController.$inject = [];
        
        ddo = {
            
            "restrict": "E",
            "templateUrl": "templates/foundItems.html",
            "scope": {
                "foundItems": "<items",
                "removeItem": "&onRemove"
            },
            "controller": foundItemsController,
            "controllerAs": "fic",
            "bindToController": true,
            "transclude": true
            
        };
        
        return ddo;
        
    };
    
    /**
     * Angular Menu Search Service !
     * @param   {object} $http HTTP Service !
     * @param   {string} url   URL constant !
     * @returns {object} Promise object (filtered http get request) !
     */
    menuSearchService = function ($http, url) {
        
        var service = this;
        
        service.getMatchedMenuItems = function (searchTerm) {
            
            var getRequestPromise,
                filteredGetRequestPromise;
            
            // Get all data from the API !
            getRequestPromise = $http.get(url + "/menu_items.json");
            
            // Once data in retrieved, filter it for the search term provided by controller !
            filteredGetRequestPromise = getRequestPromise.then(function (result) {
                
                // Start with an empty array !
                var foundItems;
                
                // Filter all items from the API for the search term !
                foundItems = result.data.menu_items.filter(function (item) {
                    
                    return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                    
                });
                
                // Return filtered (found) items, wrapped in another promise (automatically) !
                return foundItems;
                
            });
            
            // Return filtered promise !
            return filteredGetRequestPromise;
            
        };
        
    };
    
    /**
     * Angular To Buy Controller !
     * @param {object} MenuSearchService Menu search service (singleton) !
     */
    narrowItDownController = function (MenuSearchService) {
        
        var vm = this,
            menuSearchPromise;
        
        // Default value for the search term !
        vm.searchTerm = "";
        
        // Default value for error indicatior (to indicate whether nothing is entered as search term or there are no search results) !
        vm.errorIndicator = -1; // -1 - starting position, 0 - no errors, 1 - search term is empty, 2 - there were no results ! 
        
        /**
         * Search function, that uses Menu Search Service !
         */
        vm.search = function () {
            
            // Check if search term is still empty string !
            if (vm.searchTerm === "") {
                
                vm.errorIndicator = 1;
                
            } else {
                
                // Get items from the service !
                menuSearchPromise = MenuSearchService.getMatchedMenuItems(vm.searchTerm);

                menuSearchPromise.then(function (result) {
                    
                    // Remove error message, in case there were any !
                    vm.errorIndicator = 0;
                    
                    if (result.length === 0) {
                        
                        vm.errorIndicator = 2;
                        
                    } else {
                        
                        // Set the result !
                        vm.found = result;
                        
                    }

                });
                
            }
            
        };
        
        /**
         * Removes an item from the items list !
         * @param {number} itemIndex Index of the item that needs to be removed !
         */
        vm.remove = function (itemIndex) {
            
            vm.found.splice(itemIndex, 1);
            
        };
        
    };
    
    // Define Angular Module !
    narrowItDownApp = angular.module("NarrowItDownApp", []);
    
    // Define Angular constant to hold the url for API !
    narrowItDownApp.constant("ApiURL", "https://davids-restaurant.herokuapp.com");
    
    // Inject the dependencies for foundItems Directive
    foundItemsDirective.$inject = [];
    
    // Attaching the directive function !
    narrowItDownApp.directive("foundItems", foundItemsDirective);
    
    // Inject the dependencies for MenuSearchService !
    menuSearchService.$inject = ["$http", "ApiURL"];
    
    // Attaching the service function !
    narrowItDownApp.service("MenuSearchService", menuSearchService);
    
    // Inject the dependencies for NarrowItDownController !
    narrowItDownController.$inject = ["MenuSearchService"];
    
    // Attaching the controller function !
    narrowItDownApp.controller("NarrowItDownController", narrowItDownController);
    
}());