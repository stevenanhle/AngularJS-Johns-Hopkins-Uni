(function(){
  'use strict';
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', function($scope){

    $scope.myLunch ="";

    $scope.checkStatus = function(){
      //$scope.food = $scope.myLunch;
      $scope.advice = checkLunch($scope.myLunch);
    }

    function checkLunch(lunch) {

       var arrayFood = lunch.split(",");
       var number =0;
       for (var i=0; i<arrayFood.length; i++)
       {
         if(arrayFood[i].trim()!="")
           number ++;
       }
       if (number ==0)
       {
          $scope.textbox="redtext"
          $scope.boxcolor="redbox";
          return "Please enter data first";
        }
       else if(3>=number)
        {
           $scope.textbox="greentext"
          $scope.boxcolor="greenbox";
          return "Engjoy!";
        }
       else
        {
           $scope.textbox="greentext"
          $scope.boxcolor="greenbox";
          return "Too much!";
        }


    };

  });

})();
