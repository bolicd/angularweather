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




