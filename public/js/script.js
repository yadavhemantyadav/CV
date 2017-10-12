
var app = angular.module('Portfolio', ['ngRoute']);

    app.config(function($routeProvider){
        $routeProvider.when('/',{
           templateUrl:'view/home.html',
            controller:'PortFolioCtrl'
        })
        .when("/kdTimeTable", {
                 templateUrl: "view/timetable.html"
             })
        .when("/error", {
                 templateUrl: "view/error.html"
        })
        .otherwise({
                 templateUrl: "view/error.html"
        });
    });


app.controller('PortFolioCtrl', function($scope){

});

app.controller('table', function($scope, baseURL, $http, $location){
	$scope.baseURL = baseURL.getProperty();

	$scope.load = function () {

		$http.get($scope.baseURL + "/timeTable", {
                 cache: false
             })
             .success(function (response) {
             	console.log(response);
                 if (response.error_code!="0") {
                     //$location.path('/error');
                     console.log("inside" + response);
                     $scope.response = response.table;
                     console.log($scope.response);

                	console.log($scope.response.table);	
                 } else {
                     $scope.response = {"error":2};
                     console.log($scope.response);
                 }
             });

	};
	
	$scope.load();
});

app.service('baseURL', function () {
         var property = "http://192.168.0.192:5000";

         return {
             getProperty: function () {
                 return property;
             }
         };
     });




//========================      Jquery     =======================================
