(function () {
"use strict";

angular.module('customer')
.service('CusSignUpService', CusSignUpService);



function CusSignUpService()
{
  var service = this;
  service.customers =[];
  service.customer=new Object();

  service.saveCustomer = function(customer){ 
  service.customer.cusFirstName =customer.firstname;
  service.customer.cusLastName=customer.lastname;
  service.customer.custEmail =customer.email;
  service.customer.cusMenu=customer.menu;
  service.customers.push(customer);
  console.log(customer);
  console.log("list of "+customers)
    };
    
  service.getCusInformation=function(){
       console.log(service.customers)
       return service.customers;
    };

}


})
