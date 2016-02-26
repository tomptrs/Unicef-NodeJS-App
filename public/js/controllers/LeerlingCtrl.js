angular.module('LeerlingCtrl', []).controller('LeerlingController',  ['$http',"$rootScope", '$scope','PollService', function($http, $rootScope, $scope,PollService) {
var code;
  $scope.InlogLeerling = function() {
      code = this.token;
     
      
            $http
                .post('/InlogLeerling', {
                    voornaam: this.voornaam,
                    achternaam: this.achternaam,
                    token: this.token
                })
                .success(function(data) {
                    PollService.SetToken(code);                   
                });
        }

//document.body.style.background = "#F4FA58 url('../img/Logo.png') no-repeat right top"
}]);
