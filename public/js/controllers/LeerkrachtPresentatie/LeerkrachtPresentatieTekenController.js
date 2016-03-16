angular.module('LeerkrachtPresentatieTekenCtrl', []).controller('LeerkrachtPresentatieTekenCtrl', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
  document.body.style.background = "#D8D8D8"

  $scope.les = $scope.lesID;
    $scope.directory = "http://localhost:8080/pics/"+$scope.lesID;
  
    /*
    GET DRAWINGS FROM SERVER
    */
    $scope.getAnswers=function(){
    
    $http.get('/api/AntwoordDataTeken/' + $scope.lesID +'/' + $scope.vraag._id + "/"+$scope.lesID)
        .success(function(data) {
        console.log(data);
        $scope.afbeeldingen = data;
           
    });
  $scope.imgdata = "http://localhost:8080/testLes/out2.png";
  };
    
    /*
    REMOVING DRAWINGS
    */
      $scope.remove=function(){
       console.log("ID" + $scope.leerkrachtID);
    $http
        .post('/removeDrawing',{
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
