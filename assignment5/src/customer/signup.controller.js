(function () {
'use strict';

angular.module('customer')
.controller('CustomerSignUpController', CustomerSignUpController)
.controller('CustomerInforController', CustomerInforController)
.service('CusSignUpService', CusSignUpService)
.service('GetDataService',GetDataService)
.directive('myDirective', MyDirective);

   MyDirective.$inject = ['GetDataService'];
  
   function MyDirective(GetDataService) {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
            
            // function getData () {return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (response)
            //      {
            //          return response.data.menu_items;
            //      });
            //   };

            var listOfMenu=GetDataService;
              listOfMenu.then(function(response)
              {
                console.log("Please "+response);
                var listOfShortName =[];
                for(var i=0;i<response.length;i++)
                {
                  listOfShortName.push(response[i].short_name.toLowerCase());
                }
             

                if (listOfShortName.indexOf(value.trim().toLowerCase())>-1) 
                {
                    mCtrl.$setValidity('check', true);
                    var infor=true;
                
                } 
                else 
                {
                    mCtrl.$setValidity('check', false);
                } 
               
              });
               return value;
            }//end of function
            mCtrl.$parsers.push(myValidation);
        }//end of link
    };//end of reutrn
};//end of MyDirective


  
CustomerSignUpController.$inject = ['CusSignUpService'];
function CustomerSignUpController(CusSignUpService) {
  var ctrl = this;
  ctrl.customer ={};
  ctrl.customer.firstname="";
  ctrl.customer.lastname="";
  ctrl.customer.email="";
  ctrl.customer.phone="";
  ctrl.customer.menu="";

  ctrl.saveCusInformation = function(){
  
  	CusSignUpService.saveCustomer(ctrl.customer);
    
  };

  ctrl.getCusInformation = function(){
    CusSignUpService.getCusInformation();
  };
}

CustomerInforController.$inject = ['CusSignUpService'];
function CustomerInforController(CusSignUpService) {
  var ctrl = this;
  ctrl.customerInfor = CusSignUpService.getCusInformation();
}

GetDataService.$inject = ['$http'];
function GetDataService($http)
{
  return $http.get('https://my-restaurant.herokuapp.com/menu_items.json').then(function (response)
                 {
                     return response.data.menu_items;
                 });

}

CusSignUpService.$injectt=['GetDataService']
function CusSignUpService(GetDataService)
{
  var service = this;
  service.customers =[];
  service.saveCustomer = function(customer){ 
  service.customer= new Object();
  service.customer.cusFirstName =customer.firstname;
  service.customer.cusLastName=customer.lastname;
  service.customer.cusEmail =customer.email;
  service.customer.cusPhone=customer.phone;
  service.customer.cusMenu=customer.menu;
  service.customer.firstMenuChar="";

  if(customer.menu.length>3)
     service.customer.firstMenuChar=customer.menu.charAt(0)+customer.menu.charAt(1)+customer.menu.charAt(2);
  else if(customer.menu.length==3)
    service.customer.firstMenuChar=customer.menu.charAt(0)+customer.menu.charAt(1);
  else
    service.customer.firstMenuChar=customer.menu.charAt(0);

  service.customer.ObjectMenu={};
  var listOfMenu=GetDataService;
  listOfMenu.then(function(response){
  for(var i=0;i<response.length;i++)
      {
        if(response[i].short_name==customer.menu)
        {
          service.customer.ObjectMenu.name=response[i].name;
          service.customer.ObjectMenu.description=response[i].description;
          console.log(response[i].description);
        }       
      }
  });
  service.customers.push(service.customer);
}
    
    
  service.getCusInformation=function(){
    
       return service.customers;
  };

}

})();