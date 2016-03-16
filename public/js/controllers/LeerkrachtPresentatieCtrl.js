angular.module('LeerkrachtPresentatieCtrl', []) .config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }])

.controller('LeerkrachtPresentatieController', ['$http', '$scope', '$routeParams','$location', '$sce', function($http, $scope, $routeParams,$location, $sce)  {

  //document.body.style.background = "#D8D8D8";

  $scope.vragen=[];
  $scope.currentVraag=0;
  $scope.teller=0;
  $scope.max=0;
  $scope.lesID = $routeParams.lesID;
    
    
  $http.get('/api/LessenData/' + $scope.lesID)
      .success(function(data) {
      
      //Alle vragen zijn hier op de client reeds beschikbaar!!.
      //TODO: vragen één voor één zichtbaar maken
         
          $scope.les = data; //Expose the user data to your angular scope
          $scope.vragen=data.vragen;
          $scope.max = $scope.vragen.length;
      
      
          if($scope.vragen[0].soort=="open"){
               console.log("open");
               $scope.template = $scope.templates[0];
              
           }
            else if($scope.vragen[0].soort=="meerkeuze"){
               console.log("meerkeuze");
               $scope.template = $scope.templates[2];
            }
            else if($scope.vragen[0].soort=="multi"){
               console.log("multi");
               $scope.template = $scope.templates[1];
            }      
            else{
             console.log("Teken");
             $scope.template = $scope.templates[3];
           }
      
            $scope.vraag = $scope.vragen[0];
      
         /*  $http.post('/activateVraag', {
                   les_id:   $scope.lesID,
                   currentVraag_id:$scope.vragen[0]._id,
               })
               .success(function(data) {
               });*/

      });

      //to make video trustworthy for angular
      $scope.trustSrc = function(src) {
         return $sce.trustAsResourceUrl(src);
       }

      $scope.slickConfig = {
        method: {},
        dots: false,
        infinite: false,
        slidesToShow: 1 ,
        slidesToScroll: 1,
        respondTo:"min",
        prevArrow:"",
        event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          console.log('beforeChange');
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
          console.log('after change');
            $scope.currentVraag=currentSlide;
          
            if($scope.vragen[currentSlide].soort=="open"){
            $scope.$apply(function () {
               $scope.template = $scope.templates[0];
              });
                  console.log($scope.template);
           }
            
            else if($scope.vragen[currentSlide].soort=="meerkeuze"){
             $scope.$apply(function () {
                $scope.template = $scope.templates[2];
               });
                  console.log($scope.template);
           }
            
            else{
             $scope.$apply(function () {
                $scope.template = $scope.templates[1];
               });
                console.log($scope.template);
           }
           /*$http.post('/changeActiefVraag', {
                   les_id:   $scope.lesID,
                   currentVraag_id:$scope.vragen[currentSlide]._id,
                   previousVraag_id:$scope.vragen[currentSlide-1]._id
               });*/
        }
      }
      };




          $scope.templates =
          [ { name: 'open', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieOpen.html'},
          { name: 'cloud', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieCloud.html'},
          { name: 'multi', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieMulti.html'},
          { name: 'teken', url: 'views/LeerkrachtPresentatie/LeerkrachtPresentatieTeken.html'}
          ];


          $scope.stopLes=function(id){
            $http.post('/StopLeerkrachtPresentatie/'+id, {
                    currentVraag_id:$scope.vragen[$scope.currentVraag]._id
                })
                .success(function(data) {
                });

          };
    
        $scope.ActiveerVraag = function(){
            console.log("Activeer vraag");
            console.log($scope.vragen[$scope.currentVraag]);
            
             $http.post('/ActiveerVraag', {
                    currentVraag:$scope.vragen[$scope.currentVraag]
                })
                .success(function(data) {
                 
                    //Vraag is geactiveerd!!
                });
        }
        
        
         $scope.Volgende = function(){
          
          console.log("volgende vraag");
          $scope.teller++;
             console.log("DE TELLER");
             console.log($scope.teller);
             console.log("max = " + $scope.max);
          if($scope.teller < $scope.max){
                $scope.currentVraag=$scope.teller;
                $scope.vraag = $scope.vragen[$scope.teller]
            
               //TODO: Hier alles wat in SLICK staat verder coderen!!
                currentSlide = $scope.teller;
                $scope.currentVraag=currentSlide;
            if($scope.vragen[currentSlide].soort=="open"){
             // $scope.$apply(function () {
                 $scope.template = $scope.templates[0];
               // });
                    console.log($scope.template);
             }else if($scope.vragen[currentSlide].soort=="meerkeuze"){
               //$scope.$apply(function () {
                  $scope.template = $scope.templates[2];
                // });
                    console.log($scope.template);
             }
              else if($scope.vragen[currentSlide].soort=="teken"){
               //$scope.$apply(function () {
                  $scope.template = $scope.templates[3];
                 //});
                    console.log($scope.template);
             }
              else{
                  
              // $scope.$apply(function () {
                  $scope.template = $scope.templates[1];
                // });
                  console.log($scope.template);
             }              
           
          }
             else{
                
                 $scope.teller--;
             }
      }
         
         
         
        $scope.Vorige = function(){
          
          console.log("vorige vraag");
          $scope.teller--;
          if($scope.teller >= 0){
                $scope.currentVraag=$scope.teller;
                $scope.vraag = $scope.vragen[$scope.teller]
            
               //TODO: Hier alles wat in SLICK staat verder coderen!!
                currentSlide = $scope.teller;
                $scope.currentVraag=currentSlide;
            if($scope.vragen[currentSlide].soort=="open"){
             // $scope.$apply(function () {
                 $scope.template = $scope.templates[0];
               // });
                    console.log($scope.template);
             }else if($scope.vragen[currentSlide].soort=="meerkeuze"){
               //$scope.$apply(function () {
                  $scope.template = $scope.templates[2];
                // });
                    console.log($scope.template);
             }
              else if($scope.vragen[currentSlide].soort=="teken"){
               //$scope.$apply(function () {
                  $scope.template = $scope.templates[3];
                 //});
                    console.log($scope.template);
             }
              else{
               //$scope.$apply(function () {
                  $scope.template = $scope.templates[1];
                 //});
                  console.log($scope.template);
             }
                
           
          }
            else{
                $scope.teller++;
            }
      }


}])  ;
