angular.module('LeerkrachtPresentatieMultiCtrl', []).controller('LeerkrachtPresentatieMultiController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
  
    //document.body.style.background = "#D8D8D8"

$scope.oplossingen=$scope.vraag.oplossingen;
$scope.results = [];
var amount=0;
    
     
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

    
    var data2=[];
    var colors= ["#F7464A","#46BFBD"];
    var teller=0;
  $scope.getAnswers=function(){
    $http.get('/api/AntwoordData/' + $scope.lesID +'/' + $scope.vraag._id)
        .success(function(data) {
              $scope.antwoorden = data;
       
        
            $scope.results = [];
            angular.forEach($scope.oplossingen, function(oplossing, key) {
                  angular.forEach($scope.antwoorden, function(value, key) {
                   // console.log(oplossing.oplossing+":"+value.antwoord);
                        
                      if(oplossing.oplossing==value.antwoord){
                          console.log("+1");
                           amount = amount+1;
                          console.log(oplossing.oplossing);
                          console.log(amount);                          
                        }
                    });
                data2[teller]={
                    value:amount,
                    color:colors[teller],
                    highlight: "#FF5A5E",
                    label:oplossing.oplossing
                };

                    $scope.results.push({
                      opl: oplossing.oplossing,
                      aantal:amount
                  });
                  amount=0;
                teller++;
                  console.log($scope.results);
          });
        
        var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
]
        // Get the context of the canvas element we want to select
var ctx = document.getElementById("myChart").getContext("2d");
        // For a pie chart
var myPieChart = new Chart(ctx).Pie(data2);
        
        
        });
      };
    


      //check of er video of image is
     if($scope.vragen.video==null)
      {
        $scope.video=true;
        $scope.afbeelding=false;
      }
    else if($scope.vragen.afbeelding==null){
        $scope.video=false;
        $scope.afbeelding=true;
      }
    else{
        $scope.video=false;
        $scope.afbeelding=false;
      }
}]);
