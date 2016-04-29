angular.module('LeerlingPresentatieMultiCtrl', []).controller('LeerlingPresentatieMultiController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
     $scope.alGeantwoord = false;
    
  $scope.addAntwoord=function(){

       $http
       .post('/addAntwoord',{
        antwoord:$scope.antwoord,
        vraagID:$scope.vraag._id
      })
      .success(function(data) {
            $scope.antwoord =null;
            $scope.alGeantwoord = true;
           console.log($scope.alGeantwoord);
        });
    };
//document.body.style.background = "#F4FA58 "


}]);
