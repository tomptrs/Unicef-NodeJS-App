
angular.module('LeerlingDrawingController', []).controller('LeerlingDrawingController', ['$http', '$scope', '$routeParams','$location', function($http, $scope, $routeParams,$location)  {
 
      // hier kan je zaken doen die ALTIJD moeten gebeuren bij het inladen van deze pagina, bijvoorbeeld: config ophalen, user checken en ophalen, een of andere call naar service met info... getNumberOfRegisterdUsers ofzo...

    var init = function() {
        //TODO check if the server send this request for drawing otherwise return to loading screen.

        $scope.les = $scope.lesID;
        
        console.log('student_drawing_controller started');
         jQuery( document ).ready(function( $ ) {
             console.log("start sketch")
            $('#colors_sketch').sketch();
        });
    };
    /*
    Stap4: Scope vars
    ------------------
    */
    $scope.sizes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    $scope.size = 5;
 
    /* Stap5: Scope functions
    -------------------------
    */

    $scope.ClearCanvas = function () {
        var tmp = $('#colors_sketch').sketch();//.prototype.clearPainting();
        tmp.actions = [];
        tmp.redraw();
        
        console.log("cleared Canvas");        
    };
    
    $scope.resize = function () {
        var tmp = $('#colors_sketch').sketch();//.prototype.clearPainting();
        tmp.size=$scope.size;
    };
    
    /*Save Picture*/
     $scope.SavePicture = function () {
           
            var canvas = document.getElementById('colors_sketch');
            var AnswerImageString = canvas.toDataURL() ;//+ "image/jpeg";
         console.log(AnswerImageString);
            //uploadAnswer(tmpanswer);
           var randNr = Math.round(Math.random()*1000);
         console.log(randNr);
            //DOE EEN POST NAAR NODEJS!
         $http
            .post('/addDrawing',{
                img:AnswerImageString,
                vraag:$scope.vraag,
                rand:randNr,
                les:$scope.lesID
        })
            .success(function(data) {
                //$scope.antwoord =null;
             console.log("image saved..");
            });
         
         

};
       // };
    

    /* Stap6: init aanroepen
    --------------------
    */
    init();
    

}]);
