//MODULES


var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']); 


//ROUTES
weatherApp.config( function($routeProvider){

	$routeProvider.
	when('/',
	{
		templateUrl: 'pages/home.htm',
		controller: 'homeController'
	}).
	when('/forecast',
	{
		templateUrl: 'pages/forecast.htm',
		controller: 'forecastController'
	}).
	when('/forecast/:days',
	{
		templateUrl: 'pages/forecast.htm',
		controller: 'forecastController'
	});
	
	
});

// SERVICE
weatherApp.service('forecastService', function(){
	
	this.city = "Some City";
	
});

// CONTROLLERS

weatherApp.controller('homeController',["$scope","forecastService", function($scope,forecastService){
	
	$scope.city =  forecastService.city;
	
	$scope.$watch('city', function(){
			forecastService.city = $scope.city;
	});

}]);

weatherApp.controller('forecastController',["$scope","$resource","$routeParams","forecastService",function($scope,$resource,$routeParams,forecastService){
	
	$scope.city =  forecastService.city;
	$scope.days = $routeParams.days || '2';
	
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
					{ callback: "JSON_CALLBACK"},
					{ get: {method: "JSONP"} });

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days } );
	
	$scope.convertToFahrenheit = function(degK) {
		return Math.round((1.8 * (degK - 273))+ 32);
	}
	
	
	$scope.convertToDate = function(dt) {
		
		return new Date(dt * 1000);
	
	}
}]);


//DIRECTIVES

weatherApp.directive("forecastDetail",function(){
		return {
			templateUrl: "pages/forecastdetail.html",
			replace:true
		}
});

// focus directive 
// will focus given input and select all text
weatherApp.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
							 _element[0].select();
            }, 0);
        }
    };
});