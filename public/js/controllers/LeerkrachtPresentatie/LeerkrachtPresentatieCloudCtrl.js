angular.module('LeerkrachtPresentatieCloudCtrl', []).controller('LeerkrachtPresentatieCloudController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
 $scope.words = [];


      $scope.remove=function(){
          
       console.log("ID - cloud" + $scope.lesID);
    $http
        .post('/removeAntwoord',{
          antwoord:null,
          vraagID:$scope.vraag._id,
           lesID: $scope.lesID
            })
        .success(function(data) {
        console.log("removed data..");
        console.log(data);
            $scope.antwoord =null;
          });

  };
    
 //generates number between 5 and 15
 $scope.getRandomSpan = function(){
         return Math.floor((Math.random()*10)+5);
       }

      $scope.vraagID=$scope.vraag._id;
      console.log($scope.vraagID);

      var word_array = [
         {text: "Lorem", weight: 15},
         {text: "Ipsum", weight: 9, link: "http://jquery.com/"},
         {text: "Dolor", weight: 6, html: {title: "I can haz any html attribute"}},
         {text: "Sit", weight: 7},
         {text: "Amet", weight: 5}
         // ...as many words as you want
     ];

      $scope.getAnswers=function(){
        $http.get('/api/antwoordData/' + $scope.lesID +'/' + $scope.vraag._id)
            .success(function(data) {
                  $scope.antwoorden = data;

                $scope.words = [];
                angular.forEach($scope.antwoorden, function(value, key) {

                $scope.words.push({
                          text: value.antwoord,
                          weight: $scope.getRandomSpan()
                      });
              });
            console.log("De woorden in de cloud zijn:");
            console.log($scope.words);
            for(var i=0;i<$scope.words.length;i++){
                console.log("gewicht= " + $scope.words[i].weight + " en het woordje = " + $scope.words[i].text);    
            }
            
            });
          };

          //check of er video of image is
          if($scope.vraag.video==null)
          {
            $scope.video=true;
            $scope.afbeelding=false;
          }else if($scope.vraag.afbeelding==null){
            $scope.video=false;
            $scope.afbeelding=true;
          }else{
            $scope.video=false;
            $scope.afbeelding=false;
          }


      document.body.style.background = "#D8D8D8"

}]);
