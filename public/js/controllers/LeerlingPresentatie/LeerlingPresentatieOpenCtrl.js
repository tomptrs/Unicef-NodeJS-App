angular.module('LeerlingPresentatieOpenCtrl', []).controller('LeerlingPresentatieOpenController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
    
    console.log($scope.vragen[0]);
    
$scope.addAntwoord=function(){
    
    console.log(this.antwoord);
    
  $http
  .post('/addAntwoord',{
    antwoord:this.antwoord,
    vraagID:$scope.vraag._id
    })
    .success(function(data) {
        $scope.antwoord =null;
      });

};
//document.body.style.background = "#F4FA58 "
}]);
