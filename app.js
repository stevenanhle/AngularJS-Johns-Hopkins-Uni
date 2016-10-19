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
<<<<<<< HEAD
          document.getElementById("textbox").setAttribute("class", "redbox");
          document.getElementsByTagName("h4")[0].style.color="red";
=======
          $scope.textbox="redtext"
          $scope.boxcolor="redbox";
>>>>>>> f61b2edbf7435a7cd275dc9e0516092474726acb
          return "Please enter data first";
        }
       else if(3>=number)
        {
<<<<<<< HEAD
          document.getElementById("textbox").setAttribute("class", "greenbox");
          document.getElementsByTagName("h4")[0].style.color="green";
=======
           $scope.textbox="greentext"
          $scope.boxcolor="greenbox";
>>>>>>> f61b2edbf7435a7cd275dc9e0516092474726acb
          return "Engjoy!";
        }
       else
        {
<<<<<<< HEAD
          document.getElementById("textbox").setAttribute("class", "greenbox");
          document.getElementsByTagName("h4")[0].style.color="green";
=======
           $scope.textbox="greentext"
          $scope.boxcolor="greenbox";
>>>>>>> f61b2edbf7435a7cd275dc9e0516092474726acb
          return "Too much!";
        }


<<<<<<< HEAD
    };
=======
    };
>>>>>>> f61b2edbf7435a7cd275dc9e0516092474726acb

  });

})();
