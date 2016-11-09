(function () {
"use strict";


angular.module('customer')
.controller('CustomerInforController', CustomerInforController)


CustomerInforController.$inject = ['CusSignUpService'];
function CustomerInforController(CusSignUpService) {
  var ctrl = this;
  ctrl.customerInfor = CusSignUpService.getCusInformation();
}

})();