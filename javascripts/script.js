
var app = angular.module('Portfolio', ['ngRoute']);

    app.config(function($routeProvider){
        $routeProvider.when('/',{
           templateUrl:'view/home.html',
            controller:'PortFolioCtrl'
        });
    });


app.controller('PortFolioCtrl', function($scope){

});


//========================      Jquery     =======================================
