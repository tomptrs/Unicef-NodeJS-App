angular.module('LeerkrachtPresentatieOpenCtrl', []).controller('LeerkrachtPresentatieOpenController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
  document.body.style.background = "#D8D8D8"

  $scope.getAnswers=function(){
    $http.get('/api/antwoordData/' + $scope.lesID +'/' + $scope.vraag._id)
        .success(function(data) {
              $scope.antwoorden = data;
            console.log($scope.antwoorden);
        });
      };
    
    
    /*
    remove vraag
    */
  /*  $scope.remove = function(){
        $http.get('/api/AntwoordRemove/' + $scope.lesID +'/' + $scope.vraag._id )
            .success(function(data) {
     
                console.log(data);
        });
    };*/
    
    $scope.remove=function(){
       console.log("ID" + $scope.leerkrachtID);
    $http
        .post('/removeAntwoord',{
          antwoord:null,
          vraagID:$scope.vraag._id,
           lesID: $scope.lesID
            })
        .success(function(data) {
            $scope.antwoord =null;
          });

  };

      //check of er video of image is
      if($scope.vraag.video!=null)
      {
        $scope.video=true;
        $scope.afbeelding=false;
      }else if($scope.vraag.afbeelding!=null){
        $scope.video=false;
        $scope.afbeelding=true;
      }else{
        $scope.video=false;
        $scope.afbeelding=false;
      }


}]);
