// CONTROLLERS

weatherApp.controller('homeController',["$scope","$location","forecastService", function($scope,$location,forecastService){
	
	$scope.city =  forecastService.city;
	
	
	$scope.$watch('city', function(){
			forecastService.city = $scope.city;
	});
	
	$scope.submitForecast = function(){
		$location.path("/forecast");
	};

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